const express = require("express");
let router = express.Router();
const multer = require("multer");
const path = require("path");
const validateCategory = require("./../middlewares/validatecategories");
var { Category } = require("./../models/Category");

//get all categories
router.get("/", async (req, res) => {
  let allcategories = await Category.find();
  return res.send(allcategories);
});

// Get icon for a category
router.get("/icon/:categoryIcon", (req, res) => {
  const icon = req.params.categoryIcon;
  res.sendFile(path.join(__dirname + "/../public/categories/" + icon));
});

//get single category
// router.get("/:id", async (req, res) => {
//   try {
//     let category = await Category.findById(req.params.id);
//     if (!category) return res.status(400).send("the ID belongs to no category"); //when id is not available
//     return res.send(category); //all good
//   } catch (err) {
//     return res.status(400).send("Invalid ID"); //when format aint correct
//   }
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/categories/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//update category
router.put(
  "/:id",
  upload.single("categoryIcon"),
  validateCategory,
  async (req, res) => {
    let category;
    if (req.file) {
      category = await Category.findById(req.params.id);
      category.categoryName = req.body.categoryName;
      category.categoryIcon = req.file.originalname;
    } else {
      category = await Category.findById(req.params.id);
      category.categoryName = req.body.categoryName;
    }
    await category.save();
    return res.send(category);
  }
);

//delete category
router.delete("/:id", async (req, res) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  return res.send(category);
});

//insert category
router.post(
  "/",
  upload.single("categoryIcon"),
  validateCategory,
  async (req, res) => {
    let category;
    if (req.file) {
      category = new Category();
      category.categoryName = req.body.categoryName;
      category.categoryIcon = req.file.originalname;
    } else {
      category = new Category();
      category.categoryName = req.body.categoryName;
    }
    await category.save();
    return res.send(category);
  }
);

module.exports = router;
