const { generateOTP, sendMail } = require("../Utility/OTPAndSendMail");
const UserVerification = require("../../Models/UserVarification");
const bcrypt = require("bcrypt");
const User = require("../../Models/User");


exports.SignUp = async (req, res) => {
    try {
        
        const { name, userName, password, confirmPassword, email, profile = "", type, passkey} = req.body;

        if (!name || !userName || !password || !confirmPassword || !email || !type || (type == "Admin" && !passkey)) {
            return res.status(400).json({
                success: false,
                message: "All field are required", 
            })
        }

        const UserEmail = await User.findOne({email});
        if (UserEmail) {
            return res.status(400).json({
                success: false,
                message: "email already exits", 
            })
        }

        const UserName = await User.findOne({userName});
        if (UserName) {
            return res.status(400).json({
                success: false,
                message: "UserName already exits, try another one", 
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

        if (type === "Admin") {
            const passkeyDB = await AdminSettings.findOne();
            if (!bcrypt.compare(passkey, passkeyDB.value)) {
                return res.status(400).json({
                    success: false,
                    message: "Inavalid passkey", 
                })
            }
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
