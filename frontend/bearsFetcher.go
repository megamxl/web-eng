package main

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
)

type Bear struct {
	Name        string `json:"name"`
	Binomial    string `json:"binomial"`
	ImageBase64 string `json:"image_base_64"`
	Range       string `json:"range"`
}

func FetchBears() ([]Bear, error) {

	resp, err := http.Get(os.Getenv("BACKEND_URL"))
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var bears []Bear
	err = json.Unmarshal(body, &bears)
	if err != nil {
		return nil, err
	}

	return bears, nil
}
