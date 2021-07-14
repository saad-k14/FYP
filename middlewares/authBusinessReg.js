var { validateBusinessRegister } = require("../models/User");

function validateBusinessRegMW(req, res, next) {
  req.body.categories = req.body.categories.split(",");
  let { error } = validateBusinessRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateBusinessRegMW;
