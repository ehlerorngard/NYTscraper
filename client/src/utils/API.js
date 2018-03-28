import axios from "axios";

export default {
  // Gets all SAVED articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // SCRAPE
  scrape: function() {
    return axios.get("/api/articles/scrape");
  },
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};