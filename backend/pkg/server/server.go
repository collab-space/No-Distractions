package server

import (
	"encoding/json"
	"net/http"
)

type FocusServer struct {
	http.Handler
}

const jsonContentType = "application/json"

func NewFocusServer() *FocusServer {
	p := new(FocusServer)

	router := http.NewServeMux()
	router.Handle("/", http.HandlerFunc(rootHandler))
	router.Handle("/watchlist", http.HandlerFunc(watchlistHandler))

	p.Handler = router
	return p

}

func rootHandler(rw http.ResponseWriter, r *http.Request) {

	type Response struct {
		Status string `json:"status"`
	}

	response := Response{"successful"}
	rw.Header().Set("content-type", jsonContentType)
	json.NewEncoder(rw).Encode(response)
}

type Watchlist struct {
	URL     string `json:"url,omitempty"`
	Limit   uint64 `json:"limit,omitempty"`
	Elapsed uint64 `json:"elapsed,omitempty"`
}

func watchlistHandler(rw http.ResponseWriter, r *http.Request) {
	watchlist := map[string]Watchlist{
		"*://*.facebook.com": {"*://*.facebook.com", 1800, 0},
		"*://*.youtube.com":  {"*://*.youtube.com", 3600, 0},
	}

	rw.Header().Set("content-type", jsonContentType)
	json.NewEncoder(rw).Encode(watchlist)
}
