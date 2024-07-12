package oauth2

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"bryja.com/app/controllers"
	"github.com/gin-gonic/gin"
	_ "github.com/google/go-github/v45/github"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "",
		ClientID:     "1053654382378-0ftd29n4b1rmrl2rven6be648sh6tdgn.apps.googleusercontent.com",
		ClientSecret: "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",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	oauthStateString = "1iu2yh3yu132ghsdajdfs1iu2yh3yu132ghsdajdfs1iu2yh3yu132ghsdajdfs1iu2yh3yu132ghsdajdfs1iu2yh3yu132ghsdajdfs1iu2yh3yu132ghsdajdfs1iu2yh3yu132ghsdajdfs1iu2yh3yu132ghsdajdfs"
)

func HandleGoogleLogin(c *gin.Context) {
	scheme := "http"
	if c.Request.TLS != nil {
		scheme = "https"
	}
	host := c.Request.Host

	googleOauthConfig.RedirectURL = fmt.Sprintf("%s://%s/auth/google/callback", scheme, host)

	url := googleOauthConfig.AuthCodeURL(oauthStateString)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

type OAuthResponse struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Picture       string `json:"picture"`
}

var emailContextKey = "oauth_email"

func HandleGoogleCallback(c *gin.Context) {
	oauthResponse, err := GetUserInfoGoogle(c.Query("state"), c.Query("code"))
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	c.Set(emailContextKey, oauthResponse.Email)
	controllers.Login(c)
	token, _ := c.Get("bearer")
	expirationTime := time.Now().Add(10 * time.Second)
	// Set access token in a cookie
	cookie := http.Cookie{
		Name:     "token",
		Value:    token.(string),
		Path:     "/",
		HttpOnly: true, // Temporarily set to false for debugging
		Secure:   true, // Temporarily set to false if not using HTTPS
		SameSite: http.SameSiteLaxMode,
		Expires:  expirationTime,
	}
	http.SetCookie(c.Writer, &cookie)
	c.Redirect(http.StatusFound, "/home")

}

func GetUserInfoGoogle(state string, code string) (*OAuthResponse, error) {
	if state != oauthStateString {
		return nil, fmt.Errorf("invalid oauth state")
	}
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange failed: %s", err.Error())
	}
	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer response.Body.Close()
	contents, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed reading response body: %s", err.Error())
	}

	var oauthResponse OAuthResponse
	err = json.Unmarshal(contents, &oauthResponse)
	if err != nil {
		return nil, fmt.Errorf("failed to parse OAuth response: %s", err.Error())
	}

	return &oauthResponse, nil
}
