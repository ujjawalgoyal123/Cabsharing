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
const { response } = require("express");

router.post("/", jsonParser, function (req, res) {
  console.log(req.user);
  res.render("request", { reciver: req.body.reciver_email, user: req.user });
});

module.exports = router;
