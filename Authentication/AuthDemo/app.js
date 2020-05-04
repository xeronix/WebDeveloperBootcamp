var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/authdemoapp");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "secret key",
    resave: false,
    saveUninitialized: false
}));


// need following two lines to use passport
app.use(passport.initialize());
app.use(passport.session());

// required for encoding and decoding the session

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ROUTES
app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret", isLoggedIn, function(req, res){
   res.render("secret"); 
});

// AUTH ROUTES
// show signup form
app.get("/register", function(req, res){
   res.render("register"); 
});

app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        } 
        
        // local login strategy (username-password), it can be facebook, twitter, google etc.
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret"); 
        });
    });
});

//LOGIN ROUTES
app.get("/login", function(req, res){
    res.render("login");    
});


// middleware is used here which is passport.authenticate which will be run when this route is hit
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
});

//LOGOUT ROUTE
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // keep going 
        return next();
    } 
    
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started ..."); 
});