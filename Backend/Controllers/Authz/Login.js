const User = require("../../Models/User");
const bcrypt = require('bcrypt');
require("dotenv").config();
const session = require("express-session");

exports.Login = async (req, res) => {

    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Field required", 
            })
        }

        const UserDetail = await User.findOne({email});
        if (!UserDetail) {
            return res.status(400).json({
                success: false,
                message: "Invalid user, try signup", 
            })
        }

        const isPasswordValid = await bcrypt.compare(password, UserDetail.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        

        let user = UserDetail.toObject();
        user.password = undefined;
        req.session.user = user;

        return res.status(200).json({
            success: true,
            message: "User Logged in successfully", 
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.logout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({
                    success: false,
                    message: "Could not log out. Please try again.",
                });
            }

            res.clearCookie("connect.sid", { path: "/" });

            return res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        });
    } catch (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
};
