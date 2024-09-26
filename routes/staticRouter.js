const express = require("express");

const URL = require("../models/url's.js");
const { restrictTo } = require("../middleware/auth.js");

const router = express.Router();

router.get("/",restrictTo("NORMAL"), async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const allURL = await URL.find({ createdBy: req.user._id });
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
