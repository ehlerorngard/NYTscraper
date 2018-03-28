const router = require("express").Router();
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");

// Matches with "/api/scrape"
router.route("/")
  .get((req, res) => {
  	axios.get("https://www.npr.org/sections/news/").then(function(response) {
	    // Then, we load that into cheerio and save it to $ for a shorthand selector
	   const $ = cheerio.load(response.data);

	   const bundle = {
	   	articulos: []
	   };

	    // Now, we grab every h2 within an article tag, and do the following:
	   $("h2.title").each(function(i, element) {
	      const result = {};

	      result.title = $(this)
	        .children("a")
	        .text();
	      result.link = $(this)
	        .children("a")
	        .attr("href");
	      
	      bundle.articulos.push(result);
	   });

	   // console.log("here's the scraped object: " + JSON.stringify(bundle));

		res.send(bundle.articulos);
		// res.render('articles', bundle);
	 });
  });

module.exports = router;
