var mongoose = require("mongoose");

var c_usersSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

var c_Users = mongoose.model("User", c_usersSchema);

module.exports = c_Users;
