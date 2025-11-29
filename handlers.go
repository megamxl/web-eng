package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

func handleMoreBears(w http.ResponseWriter, r *http.Request) {
	// Define the template data
	bears, err2 := FetchBears()
	if err2 != nil {
		log.Fatal(err2)
	}

	// Parse the template file
	tmpl, err := template.ParseFS(content, "templates/more-bears.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Execute the template with the data
	err = tmpl.Execute(w, map[string]interface{}{"bears": bears})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	// Define the template data
	var data = make(map[string]string)

	// Parse the template file
	tmpl, err := template.ParseFS(content, "templates/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Execute the template with the data
	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handleCommentsSeen(w http.ResponseWriter, r *http.Request) {

	values := r.URL.Query()
	fmt.Println(values["state"])

	pattern := ""

	if values["state"][0] == "true" {
		pattern = "templates/comment-shown.html"
	} else if values["state"][0] == "false" {
		pattern = "templates/comment-hidden.html"
	}

	renderComments(w, pattern)
}

func renderComments(w http.ResponseWriter, pattern string) {
	tmpl, err := template.ParseFS(content, pattern)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Execute the template with the data
	err = tmpl.Execute(w, map[string]interface{}{"comments": GetComments()})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handleCommentAdded(w http.ResponseWriter, r *http.Request) {

	err := r.ParseForm()
	if err != nil {
		fmt.Println("Error parsing form:", err)
		return
	}

	comment := Comment{
		Name:    r.FormValue("name"),
		Content: r.FormValue("comment"), // note: your struct field is Content, but form key is comment
	}

	fmt.Printf("%+v\n", comment)
	if comment.Name == "" || comment.Content == "" {
		http.Error(w, fmt.Sprintf("No comment found for %s", comment.Name), http.StatusBadRequest)
	}

	AddComment(comment)

	renderComments(w, "templates/comment-shown.html")

}
