const express = require("express");
const app = express();
const path = require("path");

const URL = require("./models/url's.js");

const { connectMongoDb } = require("./connection.js");

const URLRoute = require("./routes/url's.js");
const staticRoute = require("./routes/staticRouter.js");
const userRoute=require("./routes/user.js");

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.use("/user",userRoute);

app.use("/url", URLRoute);

app.use("/", staticRoute);

app.listen(8001, () => {
  console.log("server started");
});
