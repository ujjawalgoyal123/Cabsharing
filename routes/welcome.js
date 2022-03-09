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

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { required, name, email, password, confirmpassword, gender, Hall, Room, Address, birthday, phone, profile_pic} = req.body;
  let errors = [];
  if (!required || !gender || !name || !email || !password || !confirmpassword) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != confirmpassword) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Passwords has less length' });
  } 
  
  if(!emailvalidator.validate(req.body.email)){
    errors.push({ msg: 'Email format is wrong' });
  }
  
  if (errors.length > 0) {
    res.render('register', {
      errors,
      required,
      name,
      email,
      password,
      gender,
      Hall,
      Room,
      Address,
      birthday,
      phone,
      profile_pic
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          required,
          name,
          email,
          password,
          gender,
          Hall,
          Room,
          Address,
          birthday,
          phone,
          profile_pic
        });
      } else {
        const newUser = new User({
          required,
          name,
          email,
          password,
          gender,
          Hall,
          Room,
          Address,
          birthday,
          phone,
          profile_pic

        });
        
        newUser.Hall = "";
        newUser.Room = "";
        newUser.Address = "";
        newUser.birthday = "";
        newUser.phone = "";
        newUser.profile_pic = "";
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Profile
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);

router.post('/profile', (req, res) => {
  const { required, name, email, password, confirmpassword, gender, Hall, Room, Address, birthday, phone, profile_pic} = req.body;
  let errors = [];
  if (!gender ) {
    errors.push({ msg: 'Please enter Gender!' });
  }
  if ( !name ) {
    errors.push({ msg: 'Please enter Name!' });
  }
  if (phone.length != 10) {
    errors.push({ msg: 'Phone number is wrong!' });
  }  
  if(!(validateDate(req.body.birthday, responseType="boolean", dateFormat="dd/mm/yyyy"))){
    errors.push({ msg: 'Date format is wrong!' });
  }
  if (errors.length == 0) {
  User.findOneAndUpdate({ email: req.body.email }, req.body, { new: true }, (err, doc) => {
      if (!err) { req.flash('success_msg', 'Successfully update'); res.redirect('/profile'); }
  });
} else { 
  res.render("profile", {
    errors,
    user: req.body
});
  }
});

//Travelform
router.get('/travelform', ensureAuthenticated, (req, res) =>
  res.render('travelform', {
    user: req.user
  })
);

router.post('/travelform', (req, res) => {

  console.log(req.body)
  const {   origin, destination, Noof, Gen, Departuredate,time } = req.body;
  let errors = [];
  if (errors.length > 0) {
    res.render('travelform', {
      errors,
      origin,
      destination,
      Noof,
      Gen,
      Departuredate,
      time
    });
  } else {

        const newTravel = new Travel({
        origin,
        destination,
        Noof,
        Gen,
        Departuredate,
        time
        });    
        newTravel.save()
        res.redirect('/travelform');
      }
    });

//About
module.exports = router;