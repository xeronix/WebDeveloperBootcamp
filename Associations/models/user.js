var mongoose = require("mongoose");

// each user multiple posts
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
  //  posts: [postSchema]
   posts: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Post"
       }
    ]
});

module.exports = mongoose.model("User", userSchema);