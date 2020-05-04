var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Meow"
    }
    
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
  
    res.send( "The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:count", function(req, res){
    var word = req.params.word;
    var count = Number(req.params.count);
    
    var reply = "";
    
    for(var i=1; i<=count; i++) {
        reply += word;
        reply += " ";
    }
    
    res.send(reply);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found!")
})

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started!!!")
});