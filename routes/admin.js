const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var validateAdminLoginMW = require("../middlewares/authAdminLogin");

const { Admin } = require("../models/Admin");

router.post("/register", async (req, res) => {
  let admin = await Admin.findOne({ email: req.body.email });
  if (admin != null) {
    return res.status(400).send("Sorry, Admin already exists.");
  }
  admin = new Admin();
  admin.fullName = req.body.fulltName;
  admin.email = req.body.email;
  admin.password = req.body.password;
  let salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();
  return res.send();
});

router.post("/login", validateAdminLoginMW, async (req, res) => {
  let adminData = await Admin.findOne({
    email: req.body.email,
  });
  if (!adminData)
    return res.status(400).send("Sorry, Admin with this email not found.");

  let password = await bcrypt.compare(req.body.password, adminData.password);
  if (!password) return res.status(400).send("Wrong password");

  let token = jwt.sign(
    { _id: adminData._id, name: adminData.fullName },
    // config.get("jwt")
    "SomeKey"
  );

  let user2 = jwt.verify(token, "SomeKey");
  return res.send({ ok: "Login successfull", token, user2 });
});

module.exports = router;
