package main

import (
  "fmt"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
  "net/http"
  "github.com/gin-contrib/static"
  "github.com/gin-gonic/gin"
)

type User struct {
  Id int
  Username string
}

type Login struct {
  User     string `json:"username" binding:"required"`
  Password string `json:"password" binding:"required"`
}

type AddTodo struct {
  UserId int `json:"userId" binding:"required"`
  Todo string `json:"text" binding:"required"`
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

  r.Use(static.Serve("/", static.LocalFile("./public", true)))

  //INSERT INTO Users (email, display_name, password) VALUES ('jag@gmail.com','jag','password');
  r.POST("/login", func(c *gin.Context) {

    var json Login
    if err := c.ShouldBindJSON(&json); err == nil {
      var user_id int
      var password string

      fmt.Println(json.Password)

      err := db.QueryRow("SELECT user_id FROM Users where display_name=?", json.User).Scan(&user_id)
      db.QueryRow("SELECT password FROM Users where display_name=?", json.User).Scan(&password)

      fmt.Println(password)

      switch {
        case err == sql.ErrNoRows:
          fmt.Println("No user")
        case err != nil:
          fmt.Println(err)
        default:
          if json.Password == password {
            fmt.Printf("Username is %s\n", json.User)
            c.JSON(200, gin.H{
              "user": User{user_id,json.User},
            })
          } else {
            fmt.Println("wrong password")
          }
      }
    } else {
      c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    }

  })

  r.POST("/addTodo", func(c *gin.Context) {
    var json AddTodo

    err := c.ShouldBindJSON(&json)
    if (err != nil) {
      fmt.Println(err.Error())
      c.JSON(500, nil)
    }

    stmtIns, err := db.Prepare("INSERT INTO Tasks (user_id, name) VALUES( ?, ?)")
    if err != nil {
      fmt.Println(err)
    }

    _,err = stmtIns.Exec(json.UserId,json.Todo)

    if err != nil {
      c.JSON(500, nil)
    }

    c.JSON(200, nil)
  })

  r.GET("/showTodos", func(c *gin.Context) {
    res := []string{"task1", "task2"}

    c.JSON(200, gin.H{
      "todos": res,
    })
  })

  r.Run(":3000")
}