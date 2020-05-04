var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");

// get custom style sheet from this directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// any request with _method will be converted to corresponding request type of _method
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var blog = mongoose.model("Blog", blogSchema);

/*blog.create({
    title: "Test Blog",
    image: "https://images.unsplash.com/photo-1441154283565-f88df169765a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjI0MX0&s=d0f38bcf1987dab7e6b53de990bfa0a3&auto=format&fit=crop&w=600&q=60",
    body: "HELLO THIS IS A BLOG POST",
});*/

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

//RESTFUL ROUTES

//INDEX ROUTE
app.get("/blogs", function(req, res){
    blog.find({}, function(err, blogs){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // remove scripts from html in post body (as we are allowing html tags)
    blog.body.blog.body = req.sanitize(req.body.blog.body);
    
    blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});


//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
           res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);

    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlod){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   blog.findByIdAndRemove(req.params.id, function(err){
      if (err) {
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs");
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is running!");
});