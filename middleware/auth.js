const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){

  req.user=null;

  const authorizationHeaderValue = req.headers["authorization"];

  if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')){
    next();
  }

  const token = userUId.split("Bearer ")[1];

  const user = getUser(token);

  req.user = user;
  next();
}

function restrictTo(roles=[]){
  return function(req,res,next){
    if(!req.user){
      res.redirect("/login");
    }
    if(!roles.include(req.user.role)){
      res.end("unauthorized");
    }
    return next();
  }
}

module.exports = {
  checkForAuthentication,
  restrictTo
};
