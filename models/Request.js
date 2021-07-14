var mongoose = require("mongoose");
const Joi = require("joi");

var Response = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  dateOfCompletion: {
    type: Date,
  },
  details: {
    type: String,
  },
});

var requestSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  title: String,
  category: String,
  detail: String,
  minBudget: Number,
  maxBudget: Number,
  referenceImage: String,
  projectDate: Date,
  status: String,
  acceptedBy: [Response],
  ignoredBy: [mongoose.Types.ObjectId],
});

function validateRequest(data) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    category: Joi.string().required(),
    detail: Joi.string().required(),
    minBudget: Joi.number().required(),
    maxBudget: Joi.number().required(),
    referenceImage: Joi.string().allow(""),
    projectDate: Joi.date().required(),
    status: Joi.string().allow(""),
    acceptedBy: Joi.array(),
    ignoredBy: Joi.array(),
  });
  return schema.validate(data, { abortEarly: false });
}

var Request = mongoose.model("Request", requestSchema);

module.exports.Request = Request;
module.exports.validateRequest = validateRequest;
