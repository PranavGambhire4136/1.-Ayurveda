const User = require("../../Models/User");
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');

exports.Login = async (req, res) => {
    try {
        console.log("body", req.body);
        // const { email, password } = req.body;
        const { email, password } = req.query;

        if (!email || !password) {
            //// //console..log(email, " ", password);
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const UserDetail = await User.findOne({ email });
        if (!UserDetail) {
            return res.status(400).json({
                success: false,
                message: "Invalid user, try signing up",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, UserDetail.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            {
                email: UserDetail.email,
                id: UserDetail._id,
                userName: UserDetail.userName,
                name: UserDetail.name,
                type: UserDetail.type,
                profile: UserDetail.profile,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' } // Token expiration time
        );

        // Set cookie with proper cross-site settings
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: true,  // Required for cross-site cookies
            sameSite: 'none',  // Required for cross-site cookies
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: accessToken,
        });
    } catch (err) {
        // //console..errror("Error during login:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', { 
            path: '/',
            secure: true,
            sameSite: 'none'
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        // //console..errror("Error during logout:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
};
