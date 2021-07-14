var mongoose = require("mongoose");
const Joi = require("joi");

var categorySchema = mongoose.Schema({
  categoryName: String,
  categoryIcon: String,
});

var Category = mongoose.model("Category", categorySchema);

function validateCategory(data) {
  const schema = Joi.object({
    categoryName: Joi.string().min(3).max(20).required(),
    categoryIcon: Joi.string().allow(""),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Category = Category;
module.exports.validate = validateCategory;
