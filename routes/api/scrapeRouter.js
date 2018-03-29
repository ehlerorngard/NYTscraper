const router = require("express").Router();
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");

// Matches with "/api/scrape"
router.route("/npr")
  .get(function(req, res) {
  	console.log("reached express router /api/scrape/npr ");
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

router.route("/nyt")
  .get(function(req, res) {
  	console.log("reached express router /api/scrape/nyt ");

  	axios.get("https://www.nytimes.com/").then(function(response) {
	    // Then, we load that into cheerio and save it to $ for a shorthand selector
	   const $ = cheerio.load(response.data);

	   const bundle = {
	   	articulos: []
	   };


	   console.log(".then of the cheerio NYT");
	   // console.log('...and herez the response.data: ', response.data);
	    // Now, we grab every div with a class of "story-body" within an article tag, and do the following:

// ===============================

	   // $("article.story").each(function(i, element) {
	   //    const result = {};

	   //    result.title = $(this)
	   //      	.children("a")
	   //      	.text();
	   //    result.link = $(this)
	   //     	.children("a")
	   //    	.attr("href");
	   //    result.timestamp = $(this)
	   //    	.children("time")
	   //    	.attr("data-utc-timestamp");
	      
	   //    if (result.title) {
	   //    	bundle.articulos.push(result);
	   //    }
	   // });

// ===============================

	$(".theme-summary").each(function(i, element) {
	// In each .theme-summary, we grab the child with the class story-heading

	// Then we grab the inner text of the this element and store it
	// to the head variable. This is the article headline
		var head = $(this)
		  .children(".story-heading")
		  .text()
		  .trim();

		// Grab the URL of the article
		var url = $(this)
		  .children(".story-heading")
		  .children("a")
		  .attr("href");

		// Then we grab any children with the class of summary and then grab it's inner text
		// We store this to the sum variable. This is the article summary
		var timestamp = $(this)
			.children("p")
			.children("time")
			.data("utc-timestamp");

		// So long as our headline and sum and url aren't empty or undefined, do the following
		if (head && url && timestamp) {
		  // This section uses regular expressions and the trim function to tidy our headlines and summaries
		  // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
		  var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

		  // Initialize an object we will push to the articles array
		  console.log('timestamp = ', timestamp);

		  var dataToAdd = {
		    title: headNeat,
		    link: url,
		    timestamp: timestamp
		  };

		  bundle.articulos.push(dataToAdd);
		}
	});


	   // console.log("here's the scraped object: " + JSON.stringify(bundle));

		res.send(bundle.articulos);
		// res.render('articles', bundle);
	 });
  });

module.exports = router;
