const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const emailvalidator = require("email-validator");
const validateDate = require("validate-date");
// Load User model
const User = require('../models/User');
const Travel = require('../models/travel');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/feedback", function (req, res) {
  res.render("feedback");
});

router.get("/contact", function (req, res) {
  res.render("contact");
});

//About
module.exports = router;