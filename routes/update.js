const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const bodyParser = require("body-parser");
const emailvalidator = require("email-validator");
const validateDate = require("validate-date");
const jsonParser = bodyParser.json();
// Load User model
const User = require("../models/User");
const Travel = require("../models/travel");
const { default: mongoose } = require("mongoose");

function modify(journeyList) {
  journeyList.forEach((element) => {
    element._id = new mongoose.Types.ObjectId(element._id);
    element.date = new Date(element.date);
    element.Departuredate = new Date(element.Departuredate);
  });
  return journeyList;
}

function deleteJourney(journeyList, journey) {
  var ans = -1;
  for (var i = 0; i < journeyList.length; i++) {
    if (journeyList[i]._id == journey._id) {
      ans = i;
      break;
    }
  }
  return ans;
}

router.post("/", jsonParser, async (req, res) => {
  const user = req.user;
  var journeyList = modify(JSON.parse(req.body.journeyList)); // the data type of Departuredate and date changed to string
  const journeyID = req.body.journeyID;

  Travel.findById(journeyID).then((journey) => {
    const pending = journey.pending;
    if (pending.indexOf(user.email) == -1) {
      pending.push(user.email);
      journey.save();
    }
    const pos = deleteJourney(journeyList, journey);
    console.warn(pos);
    res.render("search", { isPost: false });
  });
});

module.exports = router;
