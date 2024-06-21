package main

import (
	"bryja.com/app/controllers"
	"bryja.com/app/database"
	"bryja.com/app/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	//	"github.com/gin-gonic/contrib/static"
)

func main() {
	r := gin.Default()
	database.InitDatabase()
	//r.Static("/static", "./static")
	//r.LoadHTMLGlob("templates/*")
	//r.POST("/users", createUser)
	r.Use(cors.Default())
	// protected := r.Group("/api")
	// protected.Use(middleware.AuthMiddleware())
	// {
	// 	protected.GET("/api/user", controllers.GetCurrentUser)
	// }

	// r.GET("/", func(c *gin.Context) {
	// 	http.ServeFile(c.Writer, c.Request, "static/index.html")
	// })

	// // Serve other static files directly
	// r.GET("/login", func(c *gin.Context) {
	// 	http.ServeFile(c.Writer, c.Request, "static/login.html")
	// })

	// r.GET("/register", func(c *gin.Context) {
	// 	http.ServeFile(c.Writer, c.Request, "static/register.html")
	// })

	//r.Use(middleware.AuthMiddleware())
	//r.GET("/art", controllers.CreateUser)
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.GET("/api/user", middleware.AuthMiddleware(), controllers.GetCurrentUser)
	//r.Static("/", "./goappfront/dist")
	r.Use(static.Serve("/", static.LocalFile("./goappfront/dist", true)))
	r.Run()
}
