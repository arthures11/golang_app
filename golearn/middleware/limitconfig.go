package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

type Limiter struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

type LimiterStore struct {
	store map[string]*Limiter
	mu    sync.Mutex
}

func NewLimiterStore() *LimiterStore {
	return &LimiterStore{
		store: make(map[string]*Limiter),
	}
}

func (s *LimiterStore) GetLimiter(ip string) *rate.Limiter {
	s.mu.Lock()
	defer s.mu.Unlock()

	for k, v := range s.store {
		if time.Since(v.lastSeen) > time.Minute {
			delete(s.store, k)
		}
	}

	if limiter, exists := s.store[ip]; exists {
		limiter.lastSeen = time.Now()
		return limiter.limiter
	}

	limiter := rate.NewLimiter(10, 20) //
	s.store[ip] = &Limiter{
		limiter:  limiter,
		lastSeen: time.Now(),
	}
	return limiter
}

func RateLimitMiddleware(store *LimiterStore) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		limiter := store.GetLimiter(ip)
		if !limiter.Allow() {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "suspicious activity",
			})
			return
		}
		c.Next()
	}
}
