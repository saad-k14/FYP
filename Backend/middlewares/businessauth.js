const { b_Users } = require("../models/b_usersmodel");

function businessauth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivatekey"));
    const user = b_Users.findById(decoded._id).select("-password");

    if (!user) {
      res.status(400).send("Invalid Token. User not found.");
    }
    req.user = user;
    next();
  } catch (ex) {
    return res.status(401).send(ex);
  }
}
module.exports = businessauth;
