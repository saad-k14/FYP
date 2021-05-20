const express = require("express");
let router = express.Router();
const validateRequest = require("../../middlewares/validaterequests");
var { Request } = require("../../models/requestmodel");

//insert request
router.post("/post", validateRequest, async (req, res) => {
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

//update a request
router.put("/:id", validateRequest, async (req, res) => {
  let result = await Request.findById(req.params.id);
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
//get single category
router.get("/:id", async (req, res) => {
  try {
    let request = await Request.findById(req.params.id);
    if (!request) return res.status(400).send("the ID belongs to no category"); //when id is not available
    return res.send(request); //all good
  } catch (err) {
    return res.status(400).send("Invalid ID"); //when format aint correct
  }
});

//all the requests related to a category
router.get("/businessrequests/:id", async (req, res) => {
  var result = await Request.find({ category: req.params.id });
  res.send(result);
});

//all requests by a single user
router.get("/myrequests/:id", async (req, res) => {
  var result = await Request.find({ user: req.params.id });
  res.send(result);
});

//delete a request
router.delete("/:id", async (req, res) => {
  let result = await Request.findByIdAndDelete(req.params.id);
  return res.send(result);
});

module.exports = router;
