package main

import (
  _ "github.com/go-sql-driver/mysql"
)

const (
  LOGIN_QUERY = "SELECT user_id FROM Users where display_name=? and password=?"
)

type User struct {
  Id       int
  Username string
}

func LoginService(json *LoginRequest) (int, error) {
  var userId int

  err := db.QueryRow(LOGIN_QUERY, json.Username, json.Password).Scan(&userId)
  if err != nil {
    return -1, err
  }

  return userId, nil
}