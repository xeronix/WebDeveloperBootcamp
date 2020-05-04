var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    Campground = require('./models/campground'),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    methodOverride = require("method-override");

// use it before passport config
app.use(flash());

//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// __dirname -> directory in which this script runs
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

//see the database
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// populate currentUser in every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); // move on to next middleware
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//append /campgrounds to all the campgroundRoutes
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server Has Started!");
});