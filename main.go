package main

import (
	apiV1 "github.com/DiasSadykov/algoschool-backend/api/v1"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	v1 := router.Group("v1")
	apiV1.Routes(v1)

	router.Run()
}
