var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds"),
  Comment = require("./models/comment"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user");

var commentRoutes = require("./routes/comments"),
  indexRoutes = require("./routes/index"),
  campgroundRoutes = require("./routes/campgrounds");
const { StringDecoder } = require("string_decoder");

mongoose
  .connect("mongodb://localhost:27017/yelpCamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seedDB();

// PASSPORT CONFIG
app.use(
  require("express-session")({
    secret: "this is the secret of yelpCamp",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
//app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, "localhost", function () {
  console.log("server has started");
});
