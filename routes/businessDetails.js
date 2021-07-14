const express = require("express");
let router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const validateBusinessMW = require("./../middlewares/validateBusiness");
var { BusinessDetail } = require("./../models/BusinessDetail");
const { User } = require("../models/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.get("/ratings/:id", async (req, res) => {
  let id = req.params.id;
  let business = await BusinessDetail.aggregate([
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      $unwind: {
        path: "$ratings",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "ratings.userId",
        foreignField: "_id",
        as: "ratings.user",
      },
    },
    {
      $unwind: {
        path: "$ratings.user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        ratings: {
          $push: "$ratings",
        },
      },
    },
    {
      $lookup: {
        from: "businessdetails",
        localField: "_id",
        foreignField: "_id",
        as: "businessDetails",
      },
    },
    {
      $unwind: {
        path: "$businessDetails",
      },
    },
    {
      $addFields: {
        "businessDetails.ratings": "$ratings",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$businessDetails",
      },
    },
  ]);
  return res.send(business[0].ratings);
});

router.get("/", async (req, res) => {
  let businesses = await BusinessDetail.aggregate([
    {
      $unwind: {
        path: "$ratings",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "ratings.userId",
        foreignField: "_id",
        as: "ratings.user",
      },
    },
    {
      $unwind: {
        path: "$ratings.user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        ratings: {
          $push: "$ratings",
        },
      },
    },
    {
      $lookup: {
        from: "businessdetails",
        localField: "_id",
        foreignField: "_id",
        as: "businessDetails",
      },
    },
    {
      $unwind: {
        path: "$businessDetails",
      },
    },
    {
      $addFields: {
        "businessDetails.ratings": "$ratings",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$businessDetails",
      },
    },
  ]);

  return res.send(businesses);
});

router.get("/:category", async (req, res) => {
  const category = req.params.category;
  let businesses = await BusinessDetail.find({ categories: category });
  return res.send(businesses);
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  let business = await BusinessDetail.findOne({ userId: userId });
  return res.send(business);
});

router.get("/logo/:name/:image", (req, res) => {
  const image = req.params.image;
  const name = req.params.name;
  res.sendFile(
    path.join(__dirname + "/../public/business/" + name + "/logo/" + image)
  );
});

router.get("/coverImage/:name/:image", (req, res) => {
  const image = req.params.image;
  const name = req.params.name;
  res.sendFile(
    path.join(
      __dirname + "/../public/business/" + name + "/coverImage/" + image
    )
  );
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const name = req.body.companyName;
    const type = file.fieldname;
    if (!fs.existsSync("./public/business/" + name)) {
      fs.mkdirSync("./public/business/" + name);
      fs.mkdirSync("./public/business/" + name + "/logo");
      fs.mkdirSync("./public/business/" + name + "/coverImage");
    }
    cb(null, "public/business/" + name + "/" + type);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//insert business
router.post(
  "/",
  upload.fields([{ name: "logo" }, { name: "coverImage" }]),
  validateBusinessMW,
  async (req, res) => {
    console.log("In next");
    var business;
    userId = req.body.userId;
    const user = await User.findOne({ _id: userId });
    if (Object.keys(req.files).length > 0) {
      business = new BusinessDetail({
        userId: req.body.userId,
        companyName: req.body.companyName,
        slogan: req.body.slogan,
        logo: req.files.logo[0].originalname,
        coverImage: req.files.coverImage[0].originalname,
        about: req.body.about,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        website: req.body.website,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        facebookUrl: req.body.facebookUrl,
        googleUrl: req.body.googleUrl,
        linkedInUrl: req.body.linkedInUrl,
        twitterUrl: req.body.twitterUrl,
        instagramUrl: req.body.instagramUrl,
        pinterestUrl: req.body.pinterestUrl,
        since: req.body.since,
        teamSize: req.body.teamSize,
        branches: req.body.branches,
        businessType: req.body.businessType,
        categories: user.categories,
        ratings: [],
      });
    } else {
      business = new BusinessDetail({
        userId: req.body.userId,
        companyName: req.body.companyName,
        slogan: req.body.slogan,
        about: req.body.about,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        website: req.body.website,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        facebookUrl: req.body.facebookUrl,
        googleUrl: req.body.googleUrl,
        linkedInUrl: req.body.linkedInUrl,
        twitterUrl: req.body.twitterUrl,
        instagramUrl: req.body.instagramUrl,
        pinterestUrl: req.body.pinterestUrl,
        since: req.body.since,
        teamSize: req.body.teamSize,
        branches: req.body.branches,
        businessType: req.body.businessType,
        categories: user.categories,
        ratings: [],
      });
    }
    await business.save();
    return res.send(business);
  }
);

router.put(
  "/update/:id",
  upload.fields([{ name: "logo" }, { name: "coverImage" }]),
  validateBusinessMW,
  async (req, res) => {
    const id = req.params.id;
    var business;
    if (Object.keys(req.files).length > 0) {
      business = await BusinessDetail.updateOne(
        { _id: id },
        {
          userId: req.body.userId,
          companyName: req.body.companyName,
          slogan: req.body.slogan,
          logo: req.files.logo[0].originalname,
          coverImage: req.files.coverImage[0].originalname,
          about: req.body.about,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          website: req.body.website,
          country: req.body.country,
          city: req.body.city,
          address: req.body.address,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          facebookUrl: req.body.facebookUrl,
          googleUrl: req.body.googleUrl,
          linkedInUrl: req.body.linkedInUrl,
          twitterUrl: req.body.twitterUrl,
          instagramUrl: req.body.instagramUrl,
          pinterestUrl: req.body.pinterestUrl,
          since: req.body.since,
          teamSize: req.body.teamSize,
          branches: req.body.branches,
          businessType: req.body.businessType,
        }
      );
    } else {
      business = await BusinessDetail.updateOne(
        { _id: id },
        {
          userId: req.body.userId,
          companyName: req.body.companyName,
          slogan: req.body.slogan,
          about: req.body.about,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          website: req.body.website,
          country: req.body.country,
          city: req.body.city,
          address: req.body.address,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          facebookUrl: req.body.facebookUrl,
          googleUrl: req.body.googleUrl,
          linkedInUrl: req.body.linkedInUrl,
          twitterUrl: req.body.twitterUrl,
          instagramUrl: req.body.instagramUrl,
          pinterestUrl: req.body.pinterestUrl,
          since: req.body.since,
          teamSize: req.body.teamSize,
          branches: req.body.branches,
          businessType: req.body.businessType,
        }
      );
    }
    return res.send(business);
  }
);

router.put("/rating/:id", async (req, res) => {
  const id = req.params.id;
  const business = await BusinessDetail.updateOne(
    { _id: id },
    {
      $push: {
        ratings: req.body.rating,
      },
    },
    { new: true }
  );
  return res.send(business);
});

module.exports = router;
