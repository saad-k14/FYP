const express = require("express");
let router = express.Router();
let { b_Users } = require("../../../models/b_usersmodel");
let { Request } = require("../../../models/requestmodel");
const businessauth = require("../../../middlewares/businessauth");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

//for signup
router.post("/register", async (req, res) => {
  let user = await b_Users.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User with the given email already exists");
  user = new b_Users();
  user.name = req.body.name;
  user.password = req.body.password;
  user.role = 0;
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.username = req.body.username;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.categories = req.body.categories;
  user.details = req.body.details;
  await user.save();
  return res.send(_.omit(user, ["password"]));
});

//for login
router.post("/login", async (req, res) => {
  let user = await b_Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User is not registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password!!");
  if (user.role != 0) return res.status(401).send("User role is not business");
  let token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      username: user.username,
      phone: user.phone,
      categories: user.categories,
      details: user.details,
      role: user.role,
    },
    config.get("jwtPrivatekey")
  );
  res.send(token);
});

//update user
router.put("/:id", async (req, res) => {
  let user = await b_Users.findById(req.params.id);
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.categories = req.body.categories;
  user.password = req.body.password;
  user.details = req.body.details;
  await user.save();
  return res.send(user);
});

router.put("/auth", businessauth, async (req, res) => {
  return res.send(req.user);
});

//search all users
router.get("/", async (req, res) => {
  let allusers = await b_Users.find();
  return res.send(
    allusers.map((user) =>
      _.pick(user, [
        "_id",
        "name",
        "username",
        "email",
        "phone",
        "categories",
        "details",
      ])
    )
  );
});
router.get("/myrequests", businessauth, async (req, res) => {
  let requests = await Request.find({
    category: req.user.categories[0],
    approved: false,
  });
  return res.send(requests);
});

//search a single user via username
router.get("/:username", async (req, res) => {
  try {
    let user = await b_Users.findOne({ username: req.params.username });
    if (!user) return res.status(400).send("the username belongs to no user"); //when username is not available
    return res.send(
      user.map((user) =>
        _.pick(user, [
          "_id",
          "name",
          "username",
          "email",
          "phone",
          "categories",
          "details",
        ])
      )
    ); //all good
  } catch (err) {
    return res.status(400).send("Invalid username"); //when format aint correct
  }
});

//search a single user via id
router.get("/:id", async (req, res) => {
  try {
    let user = await b_Users.findById(req.params.id);
    if (!user) return res.status(400).send("the id belongs to no user"); //when id is not available
    return res.send(
      user.map((user) =>
        _.pick(user, [
          "_id",
          "name",
          "username",
          "email",
          "phone",
          "categories",
          "details",
        ])
      )
    ); //all good
  } catch (err) {
    return res.status(400).send("Invalid id"); //when format aint correct
  }
});

//search all users that belong to a single category
router.get("/category/:categories", async (req, res) => {
  try {
    let user = await b_Users.find({ categories: req.params.categories });
    if (!user) return res.status(400).send("no accounts in this category"); //when category is not available
    return res.send(
      user.map((user) =>
        _.pick(user, [
          "_id",
          "name",
          "username",
          "email",
          "phone",
          "categories",
          "details",
        ])
      )
    ); //all good
  } catch (err) {
    return res.status(400).send("category doesn't exists"); //when format aint correct
  }
});

module.exports = router;
