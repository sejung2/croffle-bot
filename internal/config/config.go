package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	BotToken string
	GuildId  string
)

func LoadConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Println("[WARNING] No .env file found, relying on environment variables")
	}

	BotToken = os.Getenv("BOT_TOKEN")
	GuildId = os.Getenv("GUILD_ID")

	if BotToken == "" {
		log.Fatal("[ERROR] BOT_TOKEN is not set")
	}
}
