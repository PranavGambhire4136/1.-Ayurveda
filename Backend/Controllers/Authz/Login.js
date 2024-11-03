const User = require("../../Models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
        
        let UserDetails = {
            userId: UserDetail._id,
            email: UserDetail.email,
        }

        const token = jwt.sign(UserDetails, process.env.PRIVATE_KEY, { algorithm: 'HS256', expiresIn: '1h' });

        return res.status(200).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        }).json({
            success: true, 
            message: "User Logged in Successfully", 
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }

    
}