const express = require("express");
let router = express.Router();
let { c_Users } = require("../../../models/c_usersmodel");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

//for signup
router.post("/register", async (req, res) => {
  let user = await c_Users.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User with the given email already exists");
  user = new c_Users();
  user.name = req.body.name;
  user.password = req.body.password;
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.email = req.body.email;
  user.phone = req.body.phone;
  await user.save();
  return res.send(_.pick(user, ["name", "email", "phone"]));
});

router.post("/login", async (req, res) => {
  let user = await c_Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User is not registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password!!");
  let token = jwt.sign(
    { _id: user._id, name: user.name, phone: user.phone },
    config.get("jwtPrivatekey")
  );
  res.send(token);
});

//update user
router.put("/:id", async (req, res) => {
  let user = await c_Users.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = req.body.password;
  await user.save();
  return res.send(user);
});

router.get("/", async (req, res) => {
  let allusers = await c_Users.find();
  return res.send(allusers);
});

/*
//search all users
router.get("/", async (req, res) => {
  let allusers = await User.find();
  return res.send(allusers);
});

    //search a single user via username
router.get("/:username", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).send("the username belongs to no user"); //when username is not available
    return res.send(user); //all good
  } catch (err) {
    return res.status(400).send("Invalid username"); //when format aint correct
  }
});

//search all users that belong to a single category
router.get("/category/:categories", async (req, res) => {
  try {
    let user = await User.find({ categories: req.params.categories });
    if (!user) return res.status(400).send("no accounts in this category"); //when category is not available
    return res.send(user); //all good
  } catch (err) {
    return res.status(400).send("category doesn't exists"); //when format aint correct
  }
});
*/
module.exports = router;
