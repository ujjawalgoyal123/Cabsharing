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


//Travelform
router.get('/', ensureAuthenticated, (req, res) =>
  res.render('travelform', {
    user: req.user
  })
);

router.post('/', (req, res) => {

  const {   origin,         posted_by,
    email, destination, Noof, Gen, Departuredate,time } = req.body;
  let errors = [];
  let accept = [];
  let pending =[];
  if (errors.length > 0) {
    res.render('travelform', {
      errors,
      origin,
      posted_by,
      email,
      destination,
      Noof,
      Gen,
      Departuredate,
      accept,
      pending,
      time
    });
  } else {

        const newTravel = new Travel({
        origin,
        posted_by,
        email,
        destination,
        Noof,
        Gen,
        accept,
        pending,
        Departuredate,
        time
        }); 
        newTravel.posted_by = req.user.name;
        newTravel.email = req.user.email;  
        newTravel.Departuredate = newTravel.Departuredate ;
        newTravel.save()
        res.redirect('/travelform');
      }
    });

    module.exports = router;