package models

import "github.com/dgrijalva/jwt-go"

type Claims struct {
	UserId uint64 `json:"userId"`
	jwt.StandardClaims
}
