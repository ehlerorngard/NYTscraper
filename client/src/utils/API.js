import axios from "axios";

export default {
  // Gets all SAVED articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // SCRAPE
  scrapeNYT: function() {
    console.log("scrape function triggered");
    return axios.get("/api/scrape/nyt");
  },
  searchNYT: function(query) {
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
    const APIkey = "2129e7d34abf4de59fe953b5ad6f4bc0";
    const queryTrigger = "&q=";
    console.log('full query: '+ baseURL + APIkey + queryTrigger + query);
    return axios.get(baseURL + APIkey + queryTrigger + query);
  },
  scrapeNPR: function() {
    console.log("scrape function triggered");
    return axios.get("/api/scrape/npr");
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
    console.log('API.saveArticle function triggered');
    return axios.post("/api/articles", articleData);
  }
};
