const { generateOTP, sendMail } = require("../Utility/OTPAndSendMail");
const UserVerification = require("../../Models/UserVarification");
const bcrypt = require("bcrypt");

exports.SignUp = async (req, res) => {
    try {
        const { name, userName, password, confirmPassword, email, profile = "", type } = req.body;

        if (!name || !userName || !password || !confirmPassword || !email || !type) {
            return res.status(400).json({
                success: false,
                message: "All field are required", 
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm Password doesn't match", 
            })
        }

        const userVer = await UserVerification.findOne({email}) || await UserVerification.findOne({userName});
        if (userVer) {
            return res.status(400).json({
                success: true,
                message: 'otp already sent',
            })
        }
        const otpGenerated = await generateOTP();
        sendMail(otpGenerated, email);
        
        const hasshedPassword = await bcrypt.hash(password, 10);

        await UserVerification.create({
            name, 
            userName,
            password: hasshedPassword,
            email,
            profile,
            type,
            otp: otpGenerated,
            otpExpiresAt: Date.now() + 5 * 60 * 1000, //5minites
        });

        return res.status(200).json({
            success: true,
            message: "Signup initiated. Please verify OTP sent to your email.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
