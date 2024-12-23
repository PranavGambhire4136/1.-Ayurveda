const User = require("../../Models/User");
const UserVerification = require("../../Models/UserVarification");
const bcrypt = require('bcrypt');

exports.verifyOtpAndCreateUser = async (req, res) => {
    try {
        console.log('started');
        const { email, otp} = req.body;

        console.log(email, otp);
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong", 
            })
        }

        const tempUser = await UserVerification.findOne({ email, otp });
        if (!tempUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP or email",
            });
        }

        // const hashedPassword = await bcrypt.hash(tempUser.password, 10);
        
        const userToAdd = {
            name: tempUser.name,
            userName: tempUser.userName,
            password: tempUser.password,
            profile: tempUser.profile,
            email: tempUser.email,
            type: tempUser.type,
        };
        
        await User.create(userToAdd);

        await UserVerification.deleteOne({ email });

        return res.status(200).json({
            success: true,
            message: "User verified and registered successfully.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
