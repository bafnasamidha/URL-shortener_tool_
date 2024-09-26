const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUId = req.cookies?.uid;
  // const userUId = await req.headers["authorization"];
  if (!userUId) {
    return res.redirect("/login");
  }
  // const token = userUId.split("Bearer ")[1];
  const user = getUser(userUId);
  // const user = getUser(token);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUId = req.cookies?.uid;
  // const userUId = await req.headers["authorization"];
  // const token = userUId.split("Bearer ")[1];

  const user = getUser(userUId);
  // const user = getUser(token);

  req.user = user;
  next();
}
module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
