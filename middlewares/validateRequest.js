const { validateRequest } = require("./../models/Request");

//check if there are any errors in the data provided
function validateRequestMW(req, res, next) {
  let { error } = validateRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateRequestMW;
