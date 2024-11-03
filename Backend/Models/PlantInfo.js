const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Info: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    Tags: {
        type: [String],
        default: [],
    },
    Disease: {
        type: [String],
        default: [],
    },
    HowItWorks: {
        type: String,
    },
    SideEffects: {
        type: [String],
        default: [], 
    },
    Exceptions: {
        type: [String],
        default: [], 
    },
    Availability: {
        type: String,
    },
    // User: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // }
})

module.exports = mongoose.model("Info", InfoSchema);