var mongoose = require("mongoose");

var categoriesSchema = mongoose.Schema({
  title: String,
});

var Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
