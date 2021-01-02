package main

import (
	"log"
	"net/http"

	Server "github.com/collab-space/No-Distractions/backend/pkg/server"
)

func main() {

	log.Println("Starting server")
	server := Server.NewFocusServer()
	if err := http.ListenAndServe(":5000", server); err != nil {
		log.Fatalf("could not listen on port 5000 %v", err)
	}

}
