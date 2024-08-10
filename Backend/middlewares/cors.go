package middlewares

import (
	"os"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// SetupCORS configures and returns the CORS middleware as a gin.HandlerFunc
func SetupCORS() gin.HandlerFunc {
	err := godotenv.Load()
	if err != nil {
		// Handle the error if the .env file is not found
		panic("Error loading .env file")
	}

	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		allowedOrigin = "http://localhost:3000" // Default value if environment variable is not set
	}

	config := cors.Config{
		AllowOrigins:     []string{allowedOrigin},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}
	return cors.New(config)
}
