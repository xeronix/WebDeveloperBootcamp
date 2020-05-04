var mongoose = require("mongoose");

// every comment will have user data (id and username) stored
var CommentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", CommentSchema);