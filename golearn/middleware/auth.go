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

		claims := &models.Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte("12345"), nil // Replace with your actual JWT secret key
		})

		if err != nil {
			//fmt.Println("cos nie tak2", err)
			//c.Redirect(http.StatusNotFound, "/login")
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
