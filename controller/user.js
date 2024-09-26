const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      err: "Invalid Username or Password",
    });
  }
  // const sessionId = uuidv4();
  const token = setUser(user);
  // res.cookie("token", token);

  return res.json({token});
  // return res.render("home");
}

module.exports = { handleUserSignup, handleUserLogin };
