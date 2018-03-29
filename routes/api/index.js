const router = require("express").Router();
const articleRoutes = require("./articleRouter");
const scrapeRoutes = require("./scrapeRouter");

// article routes
router.use("/articles", articleRoutes);
router.use("/scrape", scrapeRoutes);

module.exports = router;
