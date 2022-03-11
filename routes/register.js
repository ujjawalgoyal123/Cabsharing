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

// Register Page
router.get('/', forwardAuthenticated, (req, res) => res.render('register'));


// Register
router.post('/', (req, res) => {
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

  module.exports = router;