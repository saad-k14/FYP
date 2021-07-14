const express = require("express");
const multer = require("multer");
const { Category } = require("../models/Category");
const { User } = require("../models/User");
let router = express.Router();
var { Request } = require("./../models/Request");
const path = require("path");
const validateRequestMW = require("../middlewares/validateRequest");

//get all request
router.get("/", async (req, res) => {
  let allRequests = await Request.find();
  return res.send(allRequests);
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userRequests = await Request.find({ userId: userId });
  res.send(userRequests);
});

router.get("/business/:userId", async (req, res) => {
  const userId = req.params.userId;
  var user = await User.findOne({ _id: userId });
  const categories = user.categories;
  const requests = await Request.find({
    category: {
      $in: categories,
    },
    ignoredBy: {
      $ne: userId,
    },
    status: "Approved",
  });
  requests.forEach((request) => {
    var date = new Date(request.projectDate);
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getMonth()];
    var str = date.getDay() + " " + month + " " + date.getFullYear();
    request.date = str;
  });
  res.send(requests);
});

router.get("/acceptedBy/:requestId", async (req, res) => {
  const requestId = req.params.requestId;
  var userIds = [];

  const request = await Request.findOne({ _id: requestId });
  request.acceptedBy.forEach((user) => {
    userIds.push(user.userId);
  });
  const users = await User.find({
    _id: {
      $in: userIds,
    },
  });
  res.send(users);
});

router.get("/referenceImage/:referenceImage", (req, res) => {
  const image = req.params.referenceImage;
  res.sendFile(path.join(__dirname + "/../public/requests/" + image));
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/requests/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//insert request
router.post(
  "/",
  upload.single("referenceImage"),
  validateRequestMW,
  async (req, res) => {
    let request;
    if (req.file) {
      request = new Request();
      request.userId = req.body.userId;
      request.category = req.body.category;
      request.title = req.body.title;
      request.detail = req.body.detail;
      request.minBudget = req.body.minBudget;
      request.maxBudget = req.body.maxBudget;
      request.referenceImage = req.file.originalname;
      request.projectDate = req.body.projectDate;
      request.status = "Pending";
      request.acceptedBy = [];
      request.ignoredBy = [];
    } else {
      request = new Request();
      request.userId = req.body.userId;
      request.category = req.body.category;
      request.title = req.body.title;
      request.detail = req.body.detail;
      request.minBudget = req.body.minBudget;
      request.maxBudget = req.body.maxBudget;
      request.referenceImage = "";
      request.projectDate = req.body.projectDate;
      request.status = "Pending";
      request.acceptedBy = [];
      request.ignoredBy = [];
    }
    await request.save();
    res.send(request);
  }
);

router.put("/discard/:id", async (req, res) => {
  const id = req.params.id;
  const request = await Request.updateOne(
    { _id: id },
    { status: "Discarded" },
    { new: true }
  );
  if (!request) return res.status(404).send("Request not found");
  res.send(request);
});

router.put("/ignore/:id", async (req, res) => {
  const id = req.params.id;
  const request = await Request.updateOne(
    { _id: id },
    { $push: { ignoredBy: req.body.businessUserId } },
    { new: true }
  );
  if (!request) return res.status(404).send("Request not found");
  res.send(request);
});

router.put("/accept/:id", async (req, res) => {
  const id = req.params.id;
  const request = await Request.updateOne(
    { _id: id },
    { $push: { acceptedBy: req.body.response } },
    { new: true }
  );
  if (!request) return res.status(404).send("Request not found");
  res.send(request);
});

router.put("/approve/:id", async (req, res) => {
  const id = req.params.id;
  const request = await Request.updateOne(
    { _id: id },
    { status: "Approved" },
    { new: true }
  );
  if (!request) return res.status(404).send("Request not found");
  res.send(request);
});

router.delete("/:id", async (req, res) => {
  let request = await Request.findByIdAndDelete(req.params.id);
  return res.send(request);
});

module.exports = router;
