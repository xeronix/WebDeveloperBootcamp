var express = require('express');
var app = express();

app.get("/", function(req, res) {
  //  res.send("<h1>Welcome to the home page!</h1>");
  res.render("home.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!")
});

