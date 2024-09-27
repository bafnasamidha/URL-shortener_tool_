const express = require("express");

const URL = require("../models/url's.js");
const { restrictTo } = require("../middleware/auth.js");

const router = express.Router();

router.get("/admin/url's", restrictTo(["ADMIN"]), async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const allURL = await URL.find({});
  return res.render("home");
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
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
