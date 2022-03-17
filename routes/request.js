const express = require("express");
const router = express.Router();
const { ensureAunthenticated, fowardAuthenticated } = require("../config/auth");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const emailvalidator = require("email-validator");
const valiDate = require("validate-date");

//Load models
const User = require("../models/User");
const Travel = require("../models/travel");
const { response } = require("express");

router.get("/", function (req, res) {
  User.findById(req.user._id, "Journey_id", function (err, userData) {
    if (err) {
      console.log(err);
    } else {
      var dataArr = new Array();
      userData.Journey_id.forEach((journeyID) => {
        Travel.findById(journeyID, function (error, journeyData) {
          if (journeyData) {
            var data = {
              pending: journeyData.pending,
              accept: journeyData.accept,
              Noof: journeyData.Noof,
            };
            dataArr.push(data);
          }
        });
      });
      console.log("Data Array is now : ", dataArr);
      res.render("request", { dataArr: dataArr });
    }
  });
});
module.exports = router;
