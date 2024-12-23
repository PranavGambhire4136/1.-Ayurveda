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
            console.log(email, " ", password);
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
                userName: UserDetail.userName,
                name: UserDetail.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' } // Token expiration time
        );

        res.cookie('token', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'lax' });

        console.log("cookie", res.getHeader('Set-Cookie'));

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: accessToken,
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

exports.logout = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const token = authHeader.split(' ')[1];


        const blacklistedTokens = new Set();

        // Add the token to the in-memory blacklist
        blacklistedTokens.add(token);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully. Token is blacklisted.",
        });
    } catch (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
};
