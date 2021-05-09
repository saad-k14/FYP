const { validate } = require("../models/categorymodel");

//check if there are any errors in the data provided
function validateCategory(req, res, next) {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateCategory;
