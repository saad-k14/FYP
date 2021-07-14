const express = require("express");
const { User } = require("../models/User");
let router = express.Router();
var { Chat } = require("./../models/Chat");

//get all contacts
router.get("/contacts/:id", async (req, res) => {
  let allRooms = await Chat.find().distinct("room");
  var contactIds = [];
  allRooms.forEach((room) => {
    var temp = room.split("_");
    if (temp[0] === req.params.id || temp[1] === req.params.id) {
      contactIds.push(temp[0]);
      contactIds.push(temp[1]);
    }
  });
  var unique = [...new Set(contactIds)];

  const index = unique.indexOf(req.params.id);
  unique.splice(index, 1);

  const contacts = await User.find({ _id: { $in: unique } });
  res.send(contacts);
});

router.get("/messages/:room", async (req, res) => {
  const room = req.params.room;
  let messages = await Chat.find({ room: room });
  console.log(messages);
  res.send(messages);
});

module.exports = router;
