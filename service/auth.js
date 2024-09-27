// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "$123sam321$";

function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, secret);
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
