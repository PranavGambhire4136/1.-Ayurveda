const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema({
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
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },
    additionalDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdditionalDetail",
    },
});

module.exports = mongoose.model("UserVerification", UserVerificationSchema);
