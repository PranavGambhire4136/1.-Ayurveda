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
        // required: true,
    },
    disLikes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'disLike',
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Like',
    },
})

module.exports = mongoose.model("Post", PostSchema);