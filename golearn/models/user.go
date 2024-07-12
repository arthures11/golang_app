package models

type User struct {
	ID              uint   `gorm:"primaryKey"`
	Email           string `gorm:"unique;not null" form:"email" `
	Password        string `gorm:"not null" form:"password" `
	Name            string `gorm:"not null" form:"name" `
	Secret_totp_key string `gorm:"default:'AAAAAAAAAAAAAAAA'" form:"secrettotp"`
}
