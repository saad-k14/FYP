var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var b_usersSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  password: String,
  details: String,
  role: {
    type: String,
    default: "business",
  },
});
var b_Users = mongoose.model("User", b_usersSchema);

//for registration
function validateBusiness(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(100).required(),
    categories: Joi.required(),
    password: Joi.string().min(6).max(16).required(),
    details: Joi.string().min().max(500).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

//for login
function validateBusinessLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
  });
  return schema.validateBusinessLogin(data, { abortEarly: false });
}

function validateCustomerLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
  });
  return schema.validateCustomerLogin(data, { abortEarly: false });
}

module.exports.b_Users = b_Users;
module.exports.validateBusinessLogin = validateBusinessLogin; //SignUp

module.exports.c_Users = b_Users;
module.exports.validateCustomerLogin = validateCustomerLogin; //SignUp
