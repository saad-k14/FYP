const Joi = require("joi");
var mongoose = require("mongoose");

var Response = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

var businessSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  companyName: String,
  slogan: String,
  about: String,
  logo: String,
  coverImage: String,
  phoneNumber: String,
  email: String,
  website: String,
  country: String,
  city: String,
  address: String,
  latitude: String,
  longitude: String,
  facebookUrl: String,
  googleUrl: String,
  linkedInUrl: String,
  twitterUrl: String,
  instagramUrl: String,
  pinterestUrl: String,
  since: String,
  teamSize: Number,
  branches: String,
  businessType: String,
  categories: [String],
  ratings: [Response],
});

var BusinessDetail = mongoose.model("BusinessDetail", businessSchema);

function validateBusiness(data) {
  const schema = Joi.object({
    userId: Joi.required(),
    companyName: Joi.string().min(3).required(),
    slogan: Joi.string().required(),
    about: Joi.string().required(),
    logo: Joi.string().allow(""),
    coverImage: Joi.string().allow(""),
    phoneNumber: Joi.string()
      .regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
      .required(),
    email: Joi.string().email().required(),
    website: Joi.string().uri().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    facebookUrl: Joi.string().allow(""),
    googleUrl: Joi.string().allow(""),
    linkedInUrl: Joi.string().allow(""),
    twitterUrl: Joi.string().allow(""),
    instagramUrl: Joi.string().allow(""),
    pinterestUrl: Joi.string().allow(""),
    since: Joi.string().required(),
    teamSize: Joi.number().integer(),
    branches: Joi.string(),
    businessType: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.BusinessDetail = BusinessDetail;
module.exports.validateBusiness = validateBusiness;
