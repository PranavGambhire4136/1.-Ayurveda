const { generateOTP, sendMail } = require("../Utility/OTPAndSendMail");
const UserVerification = require("../../Models/UserVarification");
const bcrypt = require("bcrypt");
const User = require("../../Models/User");
const AdminSettings = require("../../Models/adminSetting");
const mongoose = require('mongoose');

exports.SignUp = async (req, res) => {
    try {
        console.log("Started");
        console.log("body: ", req.body);
        const {
            name,
            userName,
            password,
            confirmPassword,
            email,
            profile = "",
            type,
            passkey,
        } = req.body;

        // Validate required fields
        // console.log('Validation 1')
        if (!name || !userName || !password || !confirmPassword || !email || !type || (type === "Admin" && !passkey)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { userName }],
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.email === email
                    ? "Email already exists"
                    : "Username already exists. Try another one",
            });
        }

        // Check password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }

        // Check for ongoing OTP verification
        const userVerification = await UserVerification.findOne({
            $or: [{ email }, { userName }],
        });
        if (userVerification) {
            return res.status(400).json({
                success: true,
                message: "OTP already sent",
            });
        }

        // Validate Admin passkey
        if (type === "Admin") {
            const passkeyDB = await AdminSettings.findOne({});
            if (!passkeyDB) {
                return res.status(400).json({
                    success: false,
                    message: "Admin passkey settings not found",
                });
            }
            const isMatch = await bcrypt.compare(passkey, passkeyDB.passkey); // Match schema field name
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid passkey",
                });
            }
        }

        // Generate OTP and send email
        const otpGenerated = await generateOTP();
        const mailSent = await sendMail(otpGenerated, email);
        if (!mailSent) {
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP. Please try again later.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user verification data
        await UserVerification.create({
            name,
            userName,
            password: hashedPassword,
            email,
            profile,
            type,
            otp: otpGenerated,
            otpExpiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        });

        return res.status(200).json({
            success: true,
            message: "Signup initiated. Please verify OTP sent to your email.",
        });
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
