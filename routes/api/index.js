const router = require("express").Router();
const articleRoutes = require("./articles");
const scrapeRoutes = require("./scrapes");

// article routes
router.use("/articles", articleRoutes);
router.use("/scrape", scrapeRoutes);

module.exports = router;
