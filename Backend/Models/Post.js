const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    postHeading: {
        type: String,
        required: true,
    },
    postContent: {
        type: String, 
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },
    postImage: {
        type: String,
        required: true,
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Like',
    },
})

module.exports = mongoose.model("Post", PostSchema);