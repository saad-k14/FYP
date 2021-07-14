const { validateBusiness } = require("./../models/BusinessDetail");

function validateBusinessMW(req, res, next) {
  console.log("In middleware");
  let { error } = validateBusiness(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateBusinessMW;
