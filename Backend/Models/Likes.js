const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },

})

module.exports = mongoose.model("Like", LikesSchema);