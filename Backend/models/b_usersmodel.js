var mongoose = require("mongoose");

var b_usersSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  categories: String,
  password: String,
  link: String,
});

var b_Users = mongoose.model("User", b_usersSchema);

module.exports = b_Users;
