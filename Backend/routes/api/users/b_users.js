const express = require("express");
let router = express.Router();
var User = require("../../../models/b_usersmodel");

//update user
router.put("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.categories = req.body.categories;
  user.password = req.body.password;
  user.link = req.body.link;
  await user.save();
  return res.send(user);
});

router.post("/", async (req, res) => {
  var result = new User();
  result.name = req.body.name;
  result.username = req.body.username;
  result.password = req.body.password;
  result.categories = req.body.categories;
  result.email = req.body.email;
  result.link = req.body.link;
  await result.save();
  res.send(result);
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
