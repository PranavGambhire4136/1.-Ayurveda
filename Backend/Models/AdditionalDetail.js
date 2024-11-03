const mongoose = require("mongoose");

const AdditionalDetailSchema = new mongoose.Schema({
    DOB: {
        type: Date,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    dateOfJoin: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("AdditionalDetail", AdditionalDetailSchema);