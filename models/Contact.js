var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

var Contact = mongoose.model("Contact", contactSchema);

module.exports.Contact = Contact;
