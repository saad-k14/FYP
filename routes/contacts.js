const express = require("express");
let router = express.Router();
var { Contact } = require("./../models/Contact");

//get all contacts
router.get("/", async (req, res) => {
  let allcontacts = await Contact.find();
  return res.send(allcontacts);
});

//insert contact
router.post("/", async (req, res) => {
  let contact = new Contact();
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.subject = req.body.subject;
  contact.message = req.body.message;
  await contact.save();
  res.send(contact);
});

module.exports = router;
