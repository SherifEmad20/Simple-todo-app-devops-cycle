package main

import (
	"fmt"
	"log"
	"taskmanager/models"
	"taskmanager/routers"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// SetupDatabaseConnection initializes and returns a database connection
func SetupDatabaseConnection() (*gorm.DB, error) {
	// Open a connection to the SQLite database
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to the database: %w", err)
	}

	// Automatically migrate the schema
	if err := models.AutoMigrate(db); err != nil {
		return nil, fmt.Errorf("failed to auto-migrate models: %w", err)
	}

	return db, nil
}

func main() {
	// Setup the database connection
	db, err := SetupDatabaseConnection()
	if err != nil {
		log.Fatalf("Error setting up the database: %v", err)
	}

	// Set up the Gin router
	r := routers.SetupRouter(db)

	// Define the port to run the server on
	port := ":8080"

	// Start the server
	if err := r.Run(port); err != nil {
		log.Fatalf("Failed to start the server: %v", err)
	}
}
