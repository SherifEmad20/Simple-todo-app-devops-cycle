package routers

import (
	"taskmanager/controllers"
	middlewares "taskmanager/middlewares"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	r.Use(middlewares.SetupCORS())

	r.GET("/", controllers.HelloWeb)
	r.GET("/tasks", controllers.FindTasks)
	r.POST("/add", controllers.CreateTask)
	r.GET("/task/:id", controllers.FindTask)
	r.PATCH("/update/:id", controllers.UpdateTask)
	r.DELETE("/delete/:id", controllers.DeleteTask)

	return r
}
