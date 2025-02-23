package routers

import (
	"taskmanager/controllers"
	"taskmanager/middlewares"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// Middleware to set the database connection
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	// Apply CORS middleware
	r.Use(middlewares.SetupCORS())

	// Group all routes under /api/backend
	api := r.Group("/api/backend")
	{
		api.GET("/", controllers.HelloWeb)
		api.GET("/tasks", controllers.FindTasks)
		api.POST("/add", controllers.CreateTask)
		api.GET("/task/:id", controllers.FindTask)
		api.PATCH("/update/:id", controllers.UpdateTask)
		api.DELETE("/delete/:id", controllers.DeleteTask)
	}

	return r
}
