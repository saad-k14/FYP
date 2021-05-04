var mongoose = require("mongoose");

var usersSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  categories: String,
  password: String,
  link: String,
  role: {
    type: String,
    default: "Customer",
  },
});

var User = mongoose.model("User", usersSchema);

module.exports = User;
