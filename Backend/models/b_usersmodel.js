var mongoose = require("mongoose");

var b_usersSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  categories: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  password: String,
  link: String,
});

var b_Users = mongoose.model("B_User", b_usersSchema);

module.exports = b_Users;
//module.exports.b_Users = b_Users;
//module.exports.b_usersSchema = b_usersSchema;
