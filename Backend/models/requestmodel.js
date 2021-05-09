var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var requestSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "C_User" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  details: String,
  minprice: Number,
  maxprice: Number,
  duration: Number,
  //acknowledgedBy: [],
  //ratingGiven: { type: Boolean, default: false },
});

var Request = mongoose.model("Request", requestSchema);

function validateRequest(data) {
  const schema = Joi.object({
    user: Joi.required(),
    category: Joi.required(),
    details: Joi.string().min(10).required(),
    minprice: Joi.number().min(0).required(),
    maxprice: Joi.number().greater(3).required(),
    duration: Joi.number().min(3).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Request = Request;
module.exports.validate = validateRequest;
