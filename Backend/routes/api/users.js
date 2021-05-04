const express = require("express");
let router = express.Router();
var User = require("../../models/b_usersmodel");

//get all users
router.get("/", async (req, res) => {
  let allusers = await User.find();
  return res.send(allusers);
});

//get single user
router.get("/:username", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).send("the username belongs to no user"); //when username is not available
    return res.send(user); //all good
  } catch (err) {
    return res.status(400).send("Invalid username"); //when format aint correct
  }
});

//get all users who belong to a specific category
router.get("/category/:categories", async (req, res) => {
  try {
    let user = await User.find({ categories: req.params.categories });
    if (!user) return res.status(400).send("no accounts in this category"); //when category is not available
    return res.send(user); //all good
  } catch (err) {
    return res.status(400).send("category doesn't exists"); //when format aint correct
  }
});

//update category
router.put("/:id", async (req, res) => {
  let category = await Category.findById(req.params.id);
  category.title = req.body.title;
  await category.save();
  return res.send(category);
});

//delete category
router.delete("/:id", async (req, res) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  return res.send(category);
});

//insert category
router.post("/post", async (req, res) => {
  let category = new Category();
  category.title = req.body.title;
  await category.save();
  return res.send(category);
});

module.exports = router;
