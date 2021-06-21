package apiV1

import "github.com/gin-gonic/gin"

func Routes(router *gin.RouterGroup) {
	router.GET("/submission/", handleSubmission)
}
