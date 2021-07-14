const express = require("express");
var { Chat } = require("../models/Chat");

const addMessage = async ({ sender, receiver, room, message }) => {
  let chat = new Chat();
  chat.sender = sender._id;
  chat.receiver = receiver._id;
  chat.room = room;
  chat.message = message;
  chat.dateTime = new Date();
  await chat.save();
  return chat;
};

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUsersInRoom = async (room) => {
  const res = await Chat.findOne({ room: room });
  return res;
};

module.exports = { addMessage };
