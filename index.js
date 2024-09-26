const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();
const path = require("path");

const { connectMongoDb } = require("./connection.js");

const URLRoute = require("./routes/url's.js");
const userRoute = require("./routes/user.js");
const staticRoute = require("./routes/staticRouter.js");


const {
  checkForAuthentication,
  restrictTo
} = require("./middleware/auth.js");

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/user", userRoute);

app.use("/url", restrictTo(["Normal"]), URLRoute);

app.use("/", checkAuth, staticRoute);

app.listen(8001, () => {
  console.log("server started");
});
