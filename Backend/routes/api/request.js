const express = require("express");
let router = express.Router();
var Request = require("../../models/request");

//get all request
router.get("/", async (req, res) => {
  let result = await Request.find();
  return res.send(result);
});

//insert category
router.post("/", async (req, res) => {
  var result = await new Request();
  result.user = req.body.user;
  result.category = req.body.category;
  result.details = req.body.details;
  result.duration = req.body.duration;
  result.minprice = req.body.minprice;
  result.maxprice = req.body.maxprice;
  await result.save();
  return res.send(result);
});

router.get("/businessrequests/:id", async (req, res) => {
  var result = await Request.find({ category: req.params.id });
  res.send(result);
});

module.exports = router;
