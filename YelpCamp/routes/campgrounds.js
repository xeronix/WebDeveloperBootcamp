var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//no need to use full path for index.js named file
var middleware = require("../middleware");

//index route
router.get("/", function(req, res) {
    //  res.render("campgrounds", {campgrounds : campgrounds});
    // get campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds : allCampgrounds, currentUser: req.user});
       }
    });
});

//create route
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description =  req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    
    Campground.create(newCampground, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//new route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// show more info about campground
router.get("/:id", function(req, res){
    // find the campground with provided id
    // render it
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        req.flash("error", "Campground not found");
        // there should not be any error if we reach this point
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


// UPDATE CAMPGROUND
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);   
        }
    });
});

// DELETE CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");   
        }
    });
});

module.exports = router;