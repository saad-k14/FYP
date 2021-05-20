const { c_Users } = require("../models/b_usersmodel");
const config = require("config");
const jwt = require("jsonwebtoken");
async function customerauth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided.");

  const decoded = jwt.verify(token, config.get("jwtPrivatekey"));
  const user = await c_Users.findById(decoded._id).select("-password");

  if (!user) {
    res.status(400).send("Invalid Token. User not found.");
  }
  if (user.role != 1) {
    res.status(400).send("User role is not business!!");
  }
  req.user = user;

  next();
}
module.exports = customerauth;
