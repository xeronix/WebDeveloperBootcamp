var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// each user multiple posts
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var user = mongoose.model("User", userSchema);

var postModel = mongoose.model("Post", postSchema);

var newUser = new user({
   email: "hermione@hogwarts.edu",
   name: "Hermione Granger",
});

newUser.posts.push({
   title: "How to bre polyjuice potion",
   content: "Go to potions class!"
});

/*newUser.save(function(err, user){
   if (err) {
       console.log(err);
   } else {
       console.log(user);
   }
});

var newPost = new postModel({
   title: "Reflection on Apples",
   content: "They are delicious"
});

newPost.save(function(err, post){
   if (err) {
       console.log(err);
   } else {
       console.log(post);
   }
});*/

user.findOne({name: "Hermione Granger"}, function(err, user){
    if (err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "3 Things i really hate",
            content: "Voldemort, Voldemort, Voldemort"
        });
        
        user.save(function(err, user){
           if (err) {
               console.log(err);
           } else {
               console.log(user);
           }
        });
    }
});