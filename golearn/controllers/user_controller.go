package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"bryja.com/app/database"
	"bryja.com/app/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/pquerna/otp/totp"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CreateUser(c *gin.Context) {

	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&user)
	c.JSON(http.StatusOK, user)
}

func EditUser(c *gin.Context) {
	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Claims not found in context"})
		return
	}

	var user models.User
	if err := database.DB.Where("id = ?", userId).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	user.Name = "changeda"
	database.DB.Save(&user)

	c.JSON(http.StatusOK, gin.H{
		"name":  user.Name,
		"email": user.Email,
	})
}

func GetCurrentUser(c *gin.Context) {
	start := time.Now()
	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Claims not found in context"})
		return
	}

	var user models.User
	if err := database.DB.Where("id = ?", userId).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	elapsed := time.Since(start)
	fmt.Println("Processing time: ", elapsed)

	c.JSON(http.StatusOK, gin.H{"username": user.Name})
}

func Register(c *gin.Context) {

	err := database.DB.Transaction(func(tx *gorm.DB) error {
		// do some database operations
		var user models.User

		// Bind the incoming form data to the user struct
		if err := c.ShouldBind(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return err
		}

		// Now you should have the populated fields from the form
		fmt.Println("Name:", user.Name)
		fmt.Println("Email:", user.Email)
		fmt.Println("Password:", user.Password)

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}

		user.Password = string(hashedPassword)

		if err := database.DB.Create(&user).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": "true",
	})
}

func verifyCaptcha(captchaResponse string) error {
	secretKey := "6Lci2gMqAAAAAGanKEJLg4eNYKuyiB3crKJ6pNqU"
	verifyURL := "https://www.google.com/recaptcha/api/siteverify"

	resp, err := http.PostForm(verifyURL,
		url.Values{"secret": {secretKey}, "response": {captchaResponse}})
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return err
	}
	fmt.Println(result)
	if success, ok := result["success"].(bool); !ok || !success {
		return errors.New("reCAPTCHA verification failed")
	}

	return nil
}

func RegisterOauth2FirstTimeUser(c *gin.Context, email string) {

	err := database.DB.Transaction(func(tx *gorm.DB) error {
		// do some database operations
		var user models.User
		user.Email = email
		user.Name = "undefined"

		// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		// if err != nil {
		// 	return err
		// }

		// user.Password = string(hashedPassword)

		if err := database.DB.Create(&user).Error; err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

}

func SetupGoogleAuthenticator(c *gin.Context) {
	userId, exists := c.Get("userId")
	fmt.Println("userId", userId)
	fmt.Println("userId2", exists)
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Claims not found in context"})
		return
	}

	var user models.User
	if err := database.DB.Where("id = ?", userId).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	key, err := totp.Generate(totp.GenerateOpts{
		Issuer:      "MARGARITTA",
		AccountName: user.Email,
	})
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to generate TOTP key"})
		return
	}
	fmt.Println(key.URL())
	user.Secret_totp_key = key.Secret()
	database.DB.Save(&user)

	c.JSON(200, gin.H{
		"secret": key.Secret(),
		"qr":     key.URL(),
	})
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Captcha  string `json:"grecaptcha"`
	TOTP     string `json:"twoFACode"`
}

func Login(c *gin.Context) {

	email, _ := c.Get("oauth_email")
	var loginReq LoginRequest
	var dbUser models.User
	if emailStr, ok := email.(string); ok && emailStr != "" {
		if err := database.DB.Where("email = ?", email).First(&dbUser).Error; err != nil {
			RegisterOauth2FirstTimeUser(c, email.(string))
			if err := database.DB.Where("email = ?", email).First(&dbUser).Error; err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
				return
			}
		}

		//expirationTime := time.Now().Add(10 * time.Second)
		expirationTime := time.Now().Add(10 * 24 * time.Hour)
		claims := &models.Claims{
			UserId: uint64(dbUser.ID),
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: expirationTime.Unix(),
				IssuedAt:  time.Now().Unix(),
				Issuer:    "arthur",
			},
		}
		c.Set("userId", dbUser.ID)
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tok, err := token.SignedString([]byte("6966008d70cd5d142c2094db5bd4ad1f70dfaa9dc4147fa0a26a3b450e78323355d95751d9e929924f21afbc1eb69495db7befecb904ae2a31118d02569e2caa08a143b3e176bd98c3d3ccaf4e8090aae51dab8643be8f4dab31fd03b90c20fc7effe6cb0acc581c05ae71c49c48b50ede4b31fe7a53ffce61a5dd803f2a4aaba9e6d96f08cbdeaabb4d1b013f2702192298bee3a0c39c052e06ec8b4921bcec7494da5628cd394a767e6409dfd50640008756de1ad27c12d3c65329d62818023abfa8e5ab2ada552db86839ab69b8a86c15affac9c139e6498035e9871428cfa4c527a44f36c507684b5a75339b746012ae16d62cc324bbaf4dd427addd2fef"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}
		// tok, err = middleware.Encrypt(tok)
		// if err != nil {
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt token"})
		// 	return
		// }

		c.Set("bearer", tok)

	} else {
		if err := c.ShouldBind(&loginReq); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := verifyCaptcha(loginReq.Captcha); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid reCAPTCHA"})
			return
		}
		email = loginReq.Email

		if err := database.DB.Where("email = ?", email).First(&dbUser).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(loginReq.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		secretKey := dbUser.Secret_totp_key

		valid := totp.Validate(loginReq.TOTP, secretKey)
		if valid {
			fmt.Println("okej 2fa")
		} else {
			fmt.Println("Invalid 2FA code")
		}

		//expirationTime := time.Now().Add(10 * time.Second)
		expirationTime := time.Now().Add(10 * 24 * time.Hour)
		claims := &models.Claims{
			UserId: uint64(dbUser.ID),
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: expirationTime.Unix(),
				IssuedAt:  time.Now().Unix(),
				Issuer:    "arthur",
			},
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString([]byte("6966008d70cd5d142c2094db5bd4ad1f70dfaa9dc4147fa0a26a3b450e78323355d95751d9e929924f21afbc1eb69495db7befecb904ae2a31118d02569e2caa08a143b3e176bd98c3d3ccaf4e8090aae51dab8643be8f4dab31fd03b90c20fc7effe6cb0acc581c05ae71c49c48b50ede4b31fe7a53ffce61a5dd803f2a4aaba9e6d96f08cbdeaabb4d1b013f2702192298bee3a0c39c052e06ec8b4921bcec7494da5628cd394a767e6409dfd50640008756de1ad27c12d3c65329d62818023abfa8e5ab2ada552db86839ab69b8a86c15affac9c139e6498035e9871428cfa4c527a44f36c507684b5a75339b746012ae16d62cc324bbaf4dd427addd2fef"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}
		// tokenString, err = middleware.Encrypt(tokenString)
		// if err != nil {
		// 	fmt.Println(err)
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt token"})
		// 	return
		// }
		cookie := http.Cookie{
			Name:     "token",
			Value:    tokenString,
			Path:     "/",
			HttpOnly: true, // Temporarily set to false for debugging
			Secure:   true, // Temporarily set to false if not using HTTPS
			SameSite: http.SameSiteLaxMode,
			Expires:  expirationTime,
		}
		http.SetCookie(c.Writer, &cookie)

		c.JSON(http.StatusOK, gin.H{
			"token":  tokenString,
			"userId": dbUser.ID,
		})
	}
}

func Home(c *gin.Context) {
	username, err := c.Cookie("user")
	if err != nil {
		c.Redirect(http.StatusFound, "/login")
		return
	}
	c.HTML(http.StatusOK, "home.html", gin.H{"username": username})
}
