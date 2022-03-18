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

router.get("/", function (req, res) {
  User.findById(req.user._id, "Journey_id", async function (err, result) {
    if (err) console.log(err);
    else {
      var journeyDataArr = [];
      const journeyIdArr = result.Journey_id;
      for (const journeyID of journeyIdArr) {
        const journeyData = await Travel.findById(journeyID).catch(
          console.error
        );

        if (!journeyData) continue;

        journeyDataArr.push({
          _id: journeyData._id,
          origin: journeyData.origin,
          destination: journeyData.destination,
          accept: journeyData.accept,
          pending: journeyData.pending,
        });
      }
      console.log(journeyDataArr);
      res.render("request", { journeyDataArr: journeyDataArr });
    }
  });
});

module.exports = router;
