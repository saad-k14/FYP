const express = require("express");
let router = express.Router();
var { Request, validate } = require("../../models/requestmodel");

//insert request
router.post("/newrequest", async (req, res) => {
  let error = validate(req.body);
  return res.send(error);
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

//get all request
router.get("/", async (req, res) => {
  let result = await Request.find();
  return res.send(result);
});

router.get("/businessrequests/:id", async (req, res) => {
  var result = await Request.find({ category: req.params.id });
  res.send(result);
});

module.exports = router;
