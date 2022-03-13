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
const Feedback = require('../models/feedback');

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

router.post("/feedback", function(req , res ) {
  const { star1, star2, star3, star4, star5, comment, time  } = req.body;
  let errors = [];
  if (errors.length > 0) {
    res.render('travelform', {
      errors,
      star1,
      star2,
      star3,
      star4,
      star5,
      comment,
      time 
    });
  } else {

        const newFeedback = new Feedback({
          errors,
          star1,
          star2,
          star3,
          star4,
          star5,
          comment,
          time 
        }); 
        console.log(newFeedback)
        newFeedback.save()
        res.redirect('/feedback');
      }    
});

//About
module.exports = router;