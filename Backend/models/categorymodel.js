var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var categoriesSchema = mongoose.Schema({
  title: String,
});

var Category = mongoose.model("Category", categoriesSchema);

function validateCategory(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Category = Category;
module.exports.validate = validateCategory;
