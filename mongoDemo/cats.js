var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);
/*
var george = new Cat({
    name: "George", 
    age: "11",
    temperament: "Grouchy"
})

george.save(function(err, cat) {
    if (err) {
        console.log("Error");
        console.log(err);
    } else {
        console.log("Added cat:");
        console.log(cat);
    }
});*/

/*
Cat.find({}, function(err, cats) {
   if (err) {
       console.log("Error");
       console.log(err);
   } else {
       console.log("All the cats...");
       console.log(cats);
   }
});*/

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});