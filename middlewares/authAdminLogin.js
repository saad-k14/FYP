var { validateAdminLogin } = require("../models/Admin");

function validateAdminLoginMW(req, res, next) {
  let admin = validateAdminLogin(req.body);
  if (admin.error) {
    let test = "";
    for (let i = 0; i < admin.error.details.length; i++) {
      test = test + admin.error.details[i].message;
      test = test + " ";
    }
    return res.status(400).send(test);
  }
  next();
}
module.exports = validateAdminLoginMW;
