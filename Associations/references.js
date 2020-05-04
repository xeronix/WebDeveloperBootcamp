var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");

var post = require("./models/post");
var user = require("./models/user");

/*user.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
});*/

post.create({
   title: "burger cooking part 4",
   content: "hahasda asdad ad ad"
}, function(err, post){
    if (err) {
        console.log(err);
    } else {
        user.findOne({email: "bob@gmail.com"}, function(err, foundUser){
            if (err) {
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                   if (err) {
                       console.log(err);
                   } else {
                       console.log(data);
                   }
                });
            }
        });
    }
});

/*user.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
   if (err) {
       console.log(err);
   } else {
       console.log(user);
   }
});*/