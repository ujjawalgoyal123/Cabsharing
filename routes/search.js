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
    var regex = new RegExp(destination);
    Travel.find({ destination: regex }).then((result) => {
      console.warn(result.length);
      res.render("search", { isPost: true, data: result });
    });
  });
  module.exports = router;