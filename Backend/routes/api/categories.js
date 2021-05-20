const express = require("express");
let router = express.Router();
const validateCategory = require("../../middlewares/validatecategories");
var { Category } = require("../../models/categorymodel");

//get all categories
router.get("/", async (req, res) => {
  console.log("ss");
  let allcategories = await Category.find();
  return res.send(allcategories);
});

//get single category
router.get("/:id", async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(400).send("the ID belongs to no category"); //when id is not available
    return res.send(category); //all good
  } catch (err) {
    return res.status(400).send("Invalid ID"); //when format aint correct
  }
});

//update category
router.put("/:id", validateCategory, async (req, res) => {
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
router.post("/post", validateCategory, async (req, res) => {
  let category = new Category();
  category.title = req.body.title;
  await category.save();
  return res.send(category);
});

module.exports = router;
