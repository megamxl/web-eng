package main

import (
	"embed"
	"log"
	"net/http"
)

//go:embed static templates
var content embed.FS

func main() {

	InitComments()

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", handleIndex)
	http.HandleFunc("/more-bears", handleMoreBears)
	http.HandleFunc("/show-comments", handleCommentsSeen)
	http.HandleFunc("/add-comment", handleCommentAdded)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}

}
