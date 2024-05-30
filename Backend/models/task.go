package models

import (
	"gorm.io/gorm"
)

type Task struct {
	ID        uint   `json:"id" gorm:"primary_key"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(&Task{})
}
