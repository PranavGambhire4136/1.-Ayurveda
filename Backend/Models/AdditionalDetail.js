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
})

module.exports = mongoose.model("AdditionalDetail", AdditionalDetailSchema);