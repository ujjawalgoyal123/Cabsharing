const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const bodyParser = require("body-parser");
const emailvalidator = require("email-validator");
const validateDate = require("validate-date");
const jsonParser = bodyParser.json();
// Load User model
const User = require('../models/User');
const Travel = require('../models/travel');

router.get("/",ensureAuthenticated, function (req, res) {
  res.render("search", { isPost: false });
});

router.post("/", jsonParser, function (req, res) {
  const destination = req.body.destination;
  const date = req.body.date;
  const time = req.body.time;
  console.warn(date, time);
  Travel.find({
    destination: destination,
    Departuredate: date,
    time: time,
  })
    .then((result) => {
      console.warn("submitted!");
      res.render("search", { isPost: true, data: result });
    })
    .catch((err) => {
      console.warn(err);
    });
});

module.exports = router;