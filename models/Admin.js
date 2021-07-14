const mongoose = require("mongoose");
const Joi = require("joi");

var adminSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

function validateAdminLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

var Admin = mongoose.model("Admin", adminSchema);

module.exports.Admin = Admin;
module.exports.validateAdminLogin = validateAdminLogin;
