var express = require('express');
var app = express();
app.set("view engine", "ejs");

var request = require('request');
var movieSearchApiUrlPrefix = "http://omdbapi.com/?s=";
var titleSearchApiUrlPrefix = "http://www.omdbapi.com/?t=";
var apiKeyUrlSuffix = "&apikey=thewdb&plot=full";

app.get("/movie/:movieName", function(req, res) {
    var movieName = req.params.movieName;
    var apiUrl = titleSearchApiUrlPrefix + movieName + apiKeyUrlSuffix;
    apiUrl = encodeURI(apiUrl);
    
    request(apiUrl, function(error, response, body) {
        if (error) {
           console.log("SOMETHING WENT WRONG!");
           console.log(error);
        } else {
           if (response.statusCode == 200) {
               var data = JSON.parse(body);
               res.render("movie", {data : data});
           }
        }
    });  
});

app.get("/", function(req, res) {
   res.render("search"); 
});

app.get("/results", function(req, res) {
    var apiUrl = movieSearchApiUrlPrefix + req.query.movie_name.trim() + apiKeyUrlSuffix;
    
    request(apiUrl, function(error, response, body) {
        if (error) {
           console.log("SOMETHING WENT WRONG!");
           console.log(error);
        } else {
           if (response.statusCode == 200) {
               var data = JSON.parse(body);
               
               if (data["Response"] === "False") {
                   res.send(data["Error"]);
               } else {
                   res.render("results", {data : data});
               }
           }
        }
    });  
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Movie App has started!!!"); 
});