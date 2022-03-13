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

router.get("/", function (req, res) {
  //i have to add authentication in this feild (Akash Kumar Bhoi)
  res.render("search", { isPost: false, user: req.user });
});

router.post("/", jsonParser, function (req, res) {
  const destination = req.body.destination;
  const date = req.body.date;
  const origin = req.body.origin;
  if (destination != "" && date != "" && origin != "") {
    Travel.find({
      destination: destination,
      Departuredate: date,
      origin: origin,
    })
      .then((result) => {
        res.render("search", { isPost: true, data: result, user: req.user });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else if (destination != "" && date == "" && origin != "") {
    Travel.find({
      destination: destination,
      origin: origin,
    })
      .then((result) => {
        res.render("search", { isPost: true, data: result, user: req.user });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else if (destination == "" && date != "" && origin != "") {
    Travel.find({
      Departuredate: date,
      origin: origin,
    })
      .then((result) => {
        res.render("search", { isPost: true, data: result, user: req.user });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else if (destination != "" && date != "" && origin == "") {
    Travel.find({
      destination: destination,
      Departuredate: date,
    })
      .then((result) => {
        res.render("search", { isPost: true, data: result, user: req.user });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else if (destination == "" && date != "" && origin == "") {
    Travel.find({
      Departuredate: date,
    })
      .then((result) => {
        res.render("search", { isPost: true, data: result, user: req.user });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else if (destination == "" && date == "" && origin != "") {
    Travel.find({
      origin: origin,
    })
      .then((result) => {
        res.render("search", { isPost: true, data: result, user: req.user });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else if (destination != "" && date == "" && origin == "") {
    Travel.find({
      destination: destination,
    })
      .then((result) => {
        res.render("search", { isPost: true, data: result, user: req.user });
      })
      .catch((err) => {
        console.warn(err);
      });
  } else {
    res.redirect("search");
  }
});


module.exports = router;
