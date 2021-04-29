const express = require("express");
let router = express.Router();

router.get("/", async (req, res) => {
  return res.send(["Cooking", "Photography"]);
});

module.exports = router;
