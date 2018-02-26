package main

import (
  "fmt"
  _ "github.com/go-sql-driver/mysql"
)

type LoginData struct {
  User     string `json:"username" binding:"required"`
  Password string `json:"password" binding:"required"`
}

func Login(int user_id, string password) {
  var json LoginData

  // err := c.ShouldBindJSON(&json)
  // fmt.Println(json.User, json.Password)
  // if err != nil {
  //   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
  // }

  fmt.Println(json.Password)

  err2 := db.QueryRow("SELECT user_id, password FROM Users where display_name=?", json.User).Scan(user_id, password)

  return err2
}