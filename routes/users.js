const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
var path = require("path");
var jwt = require("jsonwebtoken");
var validateUserLoginMW = require("../middlewares/authUserLogin");

const { User } = require("../models/User");
const multer = require("multer");
const validateUserRegMW = require("../middlewares/authUserReg");
const validateBusinessRegMW = require("../middlewares/authBusinessReg");

// Get Single User
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  res.send(user);
});

// Get Image Profile
router.get("/profilePicture/:img", (req, res) => {
  const img = req.params.img;
  res.sendFile(path.join(__dirname + "/../public/profilePhotos/" + img));
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profilePhotos/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post(
  "/register/business",
  upload.single("profilePhoto"),
  validateBusinessRegMW,
  async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user != null) {
      return res.status(400).send("Sorry, User already exists.");
    }
    if (req.file) {
      user = new User();
      user.fullName = req.body.fullName;
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.phoneNumber = req.body.phoneNumber;
      user.categories = req.body.categories;
      user.profilePhoto = req.file.originalname;
      user.role = "business";
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } else {
      user = new User();
      user.fullName = req.body.fullName;
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.phoneNumber = req.body.phoneNumber;
      user.categories = req.body.categories;
      user.role = "business";
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    await user.save();
    return res.send();
  }
);

router.post(
  "/register/user",
  upload.single("profilePhoto"),
  validateUserRegMW,
  async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user != null) {
      return res.status(400).send("Sorry, User already exists.");
    }
    if (req.file) {
      user = new User();
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.phoneNumber = req.body.phoneNumber;
      user.profilePhoto = req.file.originalname;
      user.role = "customer";
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } else {
      user = new User();
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.phoneNumber = req.body.phoneNumber;
      user.role = "customer";
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    await user.save();
    return res.send();
  }
);

router.put("/update/:id", upload.single("profile"), async (req, res) => {
  console.log("In update");
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  console.log(user);
  if (user == null) {
    return res.status(400).send("User not found");
  } else {
    user.fullName = req.body.fullName;
    if (req.file) {
      user.profilePhoto = req.file.originalname;
    } else {
      user.profilePhoto = "";
    }
    user.phoneNumber = req.body.phoneNumber;
    user.save();
    return res.send(user);
  }
});

router.post("/login", validateUserLoginMW, async (req, res) => {
  let userData = await User.findOne({
    email: req.body.email,
  });
  if (!userData)
    return res.status(400).send("Sorry, User with this email not found.");

  let password = await bcrypt.compare(req.body.password, userData.password);
  if (!password) return res.status(400).send("Wrong password");

  let token = jwt.sign(
    {
      _id: userData._id,
      name: userData.fullName,
      role: userData.role,
      profilePhoto: userData.profilePhoto,
    },
    // config.get("jwt")
    "SomeKey"
  );

  let user2 = jwt.verify(token, "SomeKey");
  return res.send({ ok: "Login successfull", token, user2 });
});

module.exports = router;
