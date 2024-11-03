const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const User = require("../../Models/User");

exports.generateOTP = async () => {
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    console.log(otp);
    return otp;
}

exports.sendMail = async (otp, email) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, 
            }
        })

        let info = await transporter.sendMail({
            from: 'Aurveda || PranavGambhire',
            to: `${email}`,
            subject: `otp for ayurveda`,
            html: `your otp is ${otp}`
        })
        console.log(info);
        return info;
    } catch (err) {
        console.log(err.message); 
    }
}