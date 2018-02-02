package main

import (
  "fmt"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
  "net/http"
  "github.com/gin-gonic/gin"
)

type User struct {
  Id int
  Username string
}

func main() {
  fmt.Println("DB running")

  db, err := sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/willandjagscooldb")
  if err != nil {
    fmt.Println("error occured")
      panic(err.Error())
  }

  defer db.Close()

  r:= gin.Default()
  r.StaticFS("/", http.Dir("./public"))

  //INSERT INTO Users (email, display_name, password) VALUES ('jag@gmail.com','jag','password');
  r.POST("/login", func(c *gin.Context) {
    display_name := c.PostForm("username")
    fmt.Println(display_name)

    var user_id int
    err := db.QueryRow("SELECT user_id FROM Users where display_name=?", display_name).Scan(&user_id)

    switch {
    case err == sql.ErrNoRows:
      fmt.Println("No user")
    case err != nil:
      fmt.Println(err)
    default:
      fmt.Printf("Username is %s\n", display_name)
      c.JSON(200, gin.H{
        "user": User{user_id,display_name},
      })
    }

  })

  r.Run(":3000")
}