const express = require("express");

const router = express.Router();

const {
  handleGenerateShortURL,
  handleDirectsURL,
  handleGetAnalytics,
} = require("../controller/url's");



router.post("/", handleGenerateShortURL);

router.get("/:id", handleDirectsURL);

router.get("/analytics/:id", handleGetAnalytics);

module.exports = router;
