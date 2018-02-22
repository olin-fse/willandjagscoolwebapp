package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Id       int
	Username string
}

type Login struct {
	User     string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type AddTodo struct {
	Todo string `json:"text" binding:"required"`
}

type Task struct {
	UserId string `json:"userId"`
	Name   string `json:"name"`
}

func main() {
	fmt.Println("DB running")

	db, err := sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/willandjagscooldb")
	if err != nil {
		fmt.Println("error occured")
		panic(err.Error())
	}

	defer db.Close()

	r := gin.Default()

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
						"user": User{user_id, json.User},
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

		if err := c.ShouldBindJSON(&json); err == nil {
			stmtIns, err := db.Prepare("INSERT INTO Tasks (user_id, name, difficulty, length) VALUES( ?, ?, ?, ? )")
			if err != nil {
				fmt.Println(err)
			}
			_, err = stmtIns.Exec(1, json, "1", "1")

			fmt.Println(json)
			c.JSON(200, gin.H{
				"task": json,
			})
		}
	})

	r.GET("/showTodos", func(c *gin.Context) {

		var res []Task

		rows, err := db.Query("SELECT * FROM Tasks")

		if err != nil {
			log.Fatal(err)
		}

		defer rows.Close()

		for rows.Next() {
			var task Task
			if err := rows.Scan(&task.UserId, &task.Name); err != nil {
				log.Fatal(err)
			} else {
				res = append(res, task)
			}
		}
		c.JSON(200, gin.H{
			"tasks": res,
		})

	})
	r.Run(":3000")
}
