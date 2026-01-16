package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

type HealthResponse struct {
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
	Service   string `json:"service"`
}

type InfoResponse struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Version     string `json:"version"`
}

func main() {
	serviceName := os.Getenv("SERVICE_NAME")
	if serviceName == "" {
		serviceName = "${{ values.component_id }}"
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from %s!", serviceName)
	})

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(HealthResponse{
			Status:    "healthy",
			Timestamp: time.Now().Format(time.RFC3339),
			Service:   serviceName,
		})
	})

	http.HandleFunc("/info", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(InfoResponse{
			Name:        serviceName,
			Description: "${{ values.description }}",
			Version:     "1.0.0",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting %s on port %s", serviceName, port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
