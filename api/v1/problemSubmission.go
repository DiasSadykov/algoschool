package apiV1

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func handleSubmission(c *gin.Context) {
	c.String(http.StatusOK, "Hello World")
}
