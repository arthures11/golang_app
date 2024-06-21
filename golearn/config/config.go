package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func GetDBConnectionString() string {
	LoadConfig()
	return os.Getenv("DB_CONNECTION_STRING")
}
