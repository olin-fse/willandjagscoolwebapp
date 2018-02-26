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
)

func init() {
  SetupDb()
  server = httptest.NewServer(Handlers())
  login = fmt.Sprintf("%s/login", server.URL)
  fmt.Println(login)
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

var _ = Describe("Test API Endpoints", func() {
  It("POST /login wrong username and password", func() {
    res := makeLoginRequest("j", "test")
    Expect(res.StatusCode).To(Equal(400))
  })
})