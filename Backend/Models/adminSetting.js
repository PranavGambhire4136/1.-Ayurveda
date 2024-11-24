const mongoose = require("mongoose");

const adminSetting = new mongoose.Schema({
    passkey: { type: String, required: true }, // Store hashed passkey for security
});

module.exports = mongoose.model("AdminSettings", adminSetting);
