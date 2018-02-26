package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type User struct {
	Id       int
	Username string
}

type Login struct {
	User     string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type AddTodo struct {
	UserId int    `json:"userId" binding:"required"`
	Todo   string `json:"text" binding:"required"`
}

type DeleteTodo struct {
	Name string `json:"deletedItem" binding:"required"`
}

type Task struct {
	UserId string `json:"userId"`
	Name   string `json:"name"`
}

func LoginHandler(c *gin.Context) {
  var json Login

  err := c.ShouldBindJSON(&json)
  fmt.Println(json.User, json.Password)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
  }

  var user_id int
  var password string

  fmt.Println(json.Password)

  err2 := db.QueryRow("SELECT user_id FROM Users where display_name=?", json.User).Scan(&user_id)
  db.QueryRow("SELECT password FROM Users where display_name=?", json.User).Scan(&password)

  switch {
    case err2 == sql.ErrNoRows:
      c.Status(http.StatusBadRequest)
    case err2 != nil:
      c.Status(http.StatusInternalServerError)
    default:
      if json.Password == password {
        fmt.Printf("Username is %s\n", json.User)
        c.JSON(http.StatusOK, gin.H{
          "user": User{user_id, json.User},
        })
      } else {
        c.Status(http.StatusUnauthorized)
        fmt.Println("wrong password")
      }
  }

  //hieu's reccomended structure of this function
  // err = service.Login(user_id, password)

  // if err != nil {
  //  c.Status(http.StatusBadRequest)
  //  return
  // }

  // c.JSON(http.StatusOK, gin.H{
  //  "user": User{user_id, json.User},
  // })
}

func addTodo(c *gin.Context) {
  var json AddTodo

  err := c.ShouldBindJSON(&json)
  if err != nil {
    fmt.Println(err.Error())
    c.JSON(500, nil)
  }

  stmtIns, err := db.Prepare("INSERT INTO Tasks (user_id, name) VALUES( ?, ?)")
  if err != nil {
    fmt.Println(err)
  }

  _, err = stmtIns.Exec(json.UserId, json.Todo)

  if err != nil {
    c.JSON(500, nil)
  }

  c.JSON(200, nil)
}

func deleteTodo(c *gin.Context) {
  var json DeleteTodo

  err := c.ShouldBindJSON(&json)
  if err != nil {
    fmt.Println(err.Error())
    c.JSON(500, nil)
  }
  stmtIns, err := db.Prepare("DELETE FROM Tasks WHERE name=?")
  if err != nil {
    fmt.Println(err)
  }

  _, err = stmtIns.Exec(json.Name)
  fmt.Println(json)
  if err != nil {
    c.JSON(500, nil)
  }

  c.JSON(200, nil)
}

func showTodos(c *gin.Context) {
  var res []Task

  rows, err := db.Query("SELECT * FROM Tasks")

  if err != nil {
    fmt.Println(err)
  }

  defer rows.Close()

  for rows.Next() {
    var task Task
    if err := rows.Scan(&task.UserId, &task.Name); err != nil {
      fmt.Println(err)
    } else {
      res = append(res, task)
    }
  }
  c.JSON(200, gin.H{
    "tasks": res,
  })
}

func main() {
  SetupDb()
	r := Handlers()
	r.Run(":3000")

  defer db.Close()
}

func Handlers() *gin.Engine {
  r := gin.Default()

  r.POST("/login", LoginHandler)

  r.POST("/addTodo", addTodo)

  r.POST("/deleteTodo", deleteTodo)

  r.GET("/showTodos", showTodos)

  r.Use(static.Serve("/", static.LocalFile("./public", true)))

  return r
}

func SetupDb() {
  localDb, err := sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/willandjagscooldb")
  if err != nil {
    fmt.Println("error occured")
    panic(err.Error())
  }

  db = localDb
}