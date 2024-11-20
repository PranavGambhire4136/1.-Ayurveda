const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    userName: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    type: {
        type: "String",
        enum: ["Admin", "User"],
    },
    additionalDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdditionalDetail',
    },
    post: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post", 
    }
})

module.exports = mongoose.model("User", UserSchema);