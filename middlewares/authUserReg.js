var { validateUserRegister } = require("../models/User");

function validateUserRegMW(req, res, next) {
  let { error } = validateUserRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateUserRegMW;
