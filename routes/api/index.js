const router = require("express").Router();
const articleRoutes = require("./articleRouter");


// article routes
router.use("/articles", articleRoutes);


module.exports = router;
