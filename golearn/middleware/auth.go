package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"bryja.com/app/database"
	"bryja.com/app/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthorizeAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}
		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		claims := &models.Claims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte("12345"), nil // Replace with your actual JWT secret key
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		if !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Next()
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader, err := c.Cookie("token")
		if err != nil {
			fmt.Println("cos nie tak", err)
			//c.Redirect(http.StatusNotFound, "/login")
			//c.Redirect(http.StatusFound, "/login")
			c.JSON(http.StatusNotFound, gin.H{"message": "The token is invalid."})
			c.Abort()
			return
		}

		// authHeader := c.GetHeader("Authorization")
		// if authHeader == "" {
		// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
		// 	c.Abort()
		// 	return
		// }

		// Check Bearer token
		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)

		// tokenString, err = Decrypt(tokenString)
		// if err != nil {
		// 	fmt.Println(err)
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decrypt token"})
		// 	c.Abort()
		// 	return
		// }

		claims := &models.Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte("6966008d70cd5d142c2094db5bd4ad1f70dfaa9dc4147fa0a26a3b450e78323355d95751d9e929924f21afbc1eb69495db7befecb904ae2a31118d02569e2caa08a143b3e176bd98c3d3ccaf4e8090aae51dab8643be8f4dab31fd03b90c20fc7effe6cb0acc581c05ae71c49c48b50ede4b31fe7a53ffce61a5dd803f2a4aaba9e6d96f08cbdeaabb4d1b013f2702192298bee3a0c39c052e06ec8b4921bcec7494da5628cd394a767e6409dfd50640008756de1ad27c12d3c65329d62818023abfa8e5ab2ada552db86839ab69b8a86c15affac9c139e6498035e9871428cfa4c527a44f36c507684b5a75339b746012ae16d62cc324bbaf4dd427addd2fef"), nil // Replace with your actual JWT secret key
		})

		if err != nil {
			//fmt.Println("cos nie tak2", err)
			//c.Redirect(http.StatusNotFound, "/login")
			fmt.Println("expired apparently or not valid")
			c.JSON(http.StatusNotFound, gin.H{"message": "Not found"})
			c.Abort()
			return
		}

		if !token.Valid {
			fmt.Println("cos nie tak3", err)
			//c.Redirect(http.StatusNotFound, "/login")
			c.JSON(http.StatusNotFound, gin.H{"message": "Not found"})
			c.Abort()
			return
		}

		// Token is valid, retrieve user from database
		var user models.User
		if err := database.DB.First(&user, claims.UserId).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			c.Abort()
			return
		}
		// Set user context for downstream handlers
		c.Set("userId", claims.UserId)
		c.Set("tkn", tokenString)

		c.Next()
	}
}
