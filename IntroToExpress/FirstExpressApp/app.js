var express = require("express");
var app = express();

// listen for GET request on "/" (root path) and call function
app.get("/", function(req, res) {
    res.send("Hi there!");
});


// /bye sub url
app.get("/bye", function(req, res) {
    res.send("Goodbye!!");
});

// /dog sub url
app.get("/dog", function(req, res) {
    res.send("MEOW!");
});

// /r/<any sub url>, :suburl -> variable now
app.get("/r/:suburl", function(req, res) {
    var suburl = req.params.suburl;
    res.send("WELCOME TO THE " + suburl.toUpperCase() + " SUBURL!!!");
});

// any url not matching to already specified ROUTES above, order of ROUTES matter
app.get("*", function(req, res) {
    res.send("YOU ARE A STAR!!!");
});

/* 
 start server to listen on port 
 process.env.IP, process.env.PORT -> cloud9 IP and Port
*/
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!")
});