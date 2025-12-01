package main

type Comment struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

var comments []Comment

func InitComments() {
	comments = append(comments, Comment{
		Name:    "Bob Fossil",
		Content: "Oh I am so glad you taught me all about the big brown angry guys...",
	})
}

func GetComments() []Comment {
	return comments
}

func AddComment(comment Comment) {
	comments = append(comments, comment)
}
