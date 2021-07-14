var { validateUserLogin } = require("../models/User");

function validateUserLoginMW(req, res, next) {
  let user = validateUserLogin(req.body);
  if (user.error) {
    let test = "";
    for (let i = 0; i < user.error.details.length; i++) {
      test = test + user.error.details[i].message;
      test = test + " ";
    }
    console.log(test);
    return res.status(400).send(test);
  }
  next();
}
module.exports = validateUserLoginMW;
