var mongoose = require("mongoose");

var b_usersSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "C_User" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  details: String,
  minprice: Number,
  maxprice: Number,
  duration: Number,
  approvedBy: [],
  ratingGiven: { type: Boolean, default: false },
});

var Request = mongoose.model("Request", b_usersSchema);

module.exports = Request;
