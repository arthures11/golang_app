package database

import (
	"log"

	"bryja.com/app/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() { //4funshrink.fly.dev
	var err error
	//dsn := "user=postgres password=12345 dbname=goapp port=5432 sslmode=disable"
	//dsn := "host=[fdaa:1:2909:a7b:3a:5649:2cda:2] user=postgres password=KTja6tdWAQdGx7Y dbname=postgres port=5432 sslmode=disable"
	dsn := "host=fdaa:1:2909:0:1::8 user=postgres password=n8t3n4jjPZ57tdd dbname=postgres port=5432 sslmode=disable"
	//dsn := "host=fdaa:1:2909:a7b:3a:5649:2cda:2 user=postgres password=KTja6tdWAQdGx7Y dbname=postgres port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	DB.AutoMigrate(&models.User{})
}
