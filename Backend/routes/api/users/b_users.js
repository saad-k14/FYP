const express = require("express");
let router = express.Router();
let b_Users = require("../../../models/b_usersmodel");

//new user
router.post("/register", async (req, res) => {
  var result = new b_Users();
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.categories = req.body.categories;
  user.password = req.body.password;
  user.details = req.body.details;
  await result.save();
  res.send(result);
});

//update user
router.put("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
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

//search a single user via id
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("the id belongs to no user"); //when id is not available
    return res.send(user); //all good
  } catch (err) {
    return res.status(400).send("Invalid id"); //when format aint correct
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

module.exports = router;
