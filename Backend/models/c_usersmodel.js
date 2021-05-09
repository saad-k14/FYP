var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var c_usersSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});
var c_Users = mongoose.model("C_User", c_usersSchema);

//for registration
function validateCustomer(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(16).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

//for login
function validateCustomerLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
  });
  return schema.validateCustomerLogin(data, { abortEarly: false });
}

module.exports.c_Users = c_Users;
module.exports.validate = validateCustomer; //Login
module.exports.validateCustomerLogin = validateCustomerLogin; //SignUp
