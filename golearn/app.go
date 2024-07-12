package main

import (
	_ "fmt"
	"net/http"

	"bryja.com/app/controllers"
	"bryja.com/app/database"
	"bryja.com/app/middleware"
	"bryja.com/app/models"
	"bryja.com/app/oauth2"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/pquerna/otp/totp"
	//	"github.com/gin-gonic/contrib/static"
)

func verify2FA(c *gin.Context) {
	code := c.PostForm("code")
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
	secretKey := user.Secret_totp_key

	valid := totp.Validate(code, secretKey)
	if valid {
		c.JSON(200, gin.H{"message": "2FA verification successful"})
	} else {
		c.JSON(400, gin.H{"error": "Invalid 2FA code"})
	}
}

func main() {
	r := gin.Default()
	store := middleware.NewLimiterStore()
	r.Use(middleware.RateLimitMiddleware(store))
	//r.Use(ForceSSL())
	database.InitDatabase()
	r.Use(cors.Default())

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.GET("/api/user", middleware.AuthMiddleware(), controllers.GetCurrentUser)
	r.GET("/api/edit", middleware.AuthMiddleware(), controllers.EditUser)

	r.GET("/auth/google/login", oauth2.HandleGoogleLogin)
	r.GET("/auth/google/callback", oauth2.HandleGoogleCallback)

	r.POST("/setup-2fa", middleware.AuthMiddleware(), controllers.SetupGoogleAuthenticator)
	r.POST("/verify-2fa", middleware.AuthMiddleware(), verify2FA)

	r.Use(static.Serve("/", static.LocalFile("./app/webroot/", true)))

	r.NoRoute(func(c *gin.Context) {
		c.File("./app/webroot/index.html")
	})
	r.Run(":8080")
}
