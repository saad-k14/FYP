var mongoose = require("mongoose");

var chatSchema = mongoose.Schema({
  sender: mongoose.Types.ObjectId,
  receiver: mongoose.Types.ObjectId,
  room: String,
  message: String,
  dateTime: Date,
});

var Chat = mongoose.model("Chat", chatSchema);

module.exports.Chat = Chat;
