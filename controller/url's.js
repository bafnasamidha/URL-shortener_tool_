const ShortUniqueId = require("short-unique-id");
const URL = require("../models/url's.js");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const uid = new ShortUniqueId({ length: 8 });
  const shortID = uid.rnd();
  const result = URL.create({
    shortURL: shortID,
    originalURL: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  // return res.json({ msg: shortID });
  return res.render("home", {
    id: shortID,
  });
}

async function handleDirectsURL(req, res) {
  const shortURL = req.params.id;
  const entry = await URL.findOneAndUpdate(
    {
      shortURL,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.originalURL);
}

async function handleGetAnalytics(req, res) {
  const shortURL = req.params.id;
  const IDURLs = await URL.findOne({ shortURL });
  return res.json({
    totalclicks: IDURLs.visitHistory.length,
    analytics: IDURLs.visitHistory,
  });
}

module.exports = {
  handleGenerateShortURL,
  handleDirectsURL,
  handleGetAnalytics,
};
