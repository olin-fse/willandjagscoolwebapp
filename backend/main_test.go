package main

import (
  "fmt"
  "net/http"
  "io"
  "net/http/httptest"
  "log"
  "strings"

  _ "github.com/go-sql-driver/mysql"
  . "github.com/onsi/gomega"
  . "github.com/onsi/ginkgo"
)

var (
  server      *httptest.Server
  reader      io.Reader
  login string
  addTodoTest string
)

func init() {
  SetupDb()
  server = httptest.NewServer(Handlers())
  login = fmt.Sprintf("%s/login", server.URL)
  addTodoTest = fmt.Sprintf("%s/addTodo", server.URL)
  fmt.Println(login)
  fmt.Println(addTodoTest)
}

func makeLoginRequest(username string, password string) *http.Response {
  reqJson := fmt.Sprintf(`{"username": "%s", "password": %s}`, username, password)
  reader = strings.NewReader(reqJson)
  fmt.Println(reader)

  req, err := http.NewRequest("POST", login, reader)
  if err != nil {
    log.Fatal(err)
  }

  res, err := http.DefaultClient.Do(req)
  if err != nil {
    log.Fatal(err)
  }

  return res
}

func addTodoRequest(id string, text string) *http.Response {
  reqJson := fmt.Sprintf(`{"userId": "%s", "text": %s}`, id, text)
  reader = strings.NewReader(reqJson)
  fmt.Println(reader)

  req, err := http.NewRequest("POST", addTodoTest, reader)
  if err != nil {
    log.Fatal(err)
  }

  res, err := http.DefaultClient.Do(req)
  if err != nil {
    log.Fatal(err)
  }

  return res
}

var _ = Describe("Test API Endpoints", func() {
  It("POST /login wrong username and password", func() {
    res := makeLoginRequest("j", "test")
    Expect(res.StatusCode).To(Equal(400))
  })

  It("POST /login correct username wrong password", func() {
    res := makeLoginRequest("jag", "123")
    Expect(res.StatusCode).To(Equal(401))
  })

  It("POST /login correct username and password", func() {
    res := makeLoginRequest("jag", "password")
    Expect(res.StatusCode).To(Equal(200))
  })

  It("POST /addTodo", func() {
    res := addTodoRequest("1", "test")
    Expect(res.StatusCode).To(Equal(200))
  })
})