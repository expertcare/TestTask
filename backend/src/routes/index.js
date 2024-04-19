const express = require("express");
const { shortenUrl, openShortenUrl } = require("../controller/shortenurl");
const router = express.Router();


router.route("/shorten-url").post(shortenUrl);
router.route("/:urlId").get(openShortenUrl);

module.exports = router;