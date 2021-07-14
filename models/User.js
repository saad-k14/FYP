var mongoose = require("mongoose");
const Joi = require("joi");

var userSchema = mongoose.Schema({
  fullName: String,
  userName: String,
  email: String,
  password: String,
  phoneNumber: String,
  profilePhoto: String,
  categories: [String],
  role: String,
});

var User = mongoose.model("User", userSchema);

function validateUserRegister(data) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().allow(""),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
    phoneNumber: Joi.string()
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .required(),
    profilePhoto: Joi.string().allow(""),
    categories: Joi.array(),
    role: Joi.string().allow(""),
  });
  return schema.validate(data, { abortEarly: false });
}

function validateBusinessRegister(data) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
    phoneNumber: Joi.string()
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .required(),
    profilePhoto: Joi.string().allow(""),
    categories: Joi.array().items(Joi.string()),
    role: Joi.string().allow(""),
  });
  return schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.validateUserLogin = validateUserLogin;
module.exports.validateUserRegister = validateUserRegister;
module.exports.validateBusinessRegister = validateBusinessRegister;
