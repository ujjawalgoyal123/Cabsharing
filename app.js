var express = require("express");
var path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const uc = require("upper-case");
var app = express();

require("./config/passport")(passport);

const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static(path.join(__dirname, "/assets")));

var routes = require("./routes/welcome");
const User = require("./models/User");
const Travel = require("./models/travel");
app.use("/", routes);

app.get("/search", function (req, res) {
  res.render("search", { isPost: false });
});

app.post("/search", jsonParser, function (req, res) {
  const destination = req.body.destination;
  const date = req.body.date;
  const time = req.body.time;
  console.warn(date, time);
  Travel.find({
    destination: destination,
    Departuredate: date,
    time: time,
  }).then((result) => {
    res.render("search", { isPost: true, data: result });
  });
});

app.get("/request", function (req, res) {
  res.render("request");
});
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
