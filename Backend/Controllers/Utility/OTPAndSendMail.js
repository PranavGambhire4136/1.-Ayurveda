const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const User = require("../../Models/User");

exports.generateOTP = async () => {
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    //console.log(otp);
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
            subject: `OTP for Ayurveda Platform`,
            html: `
                <h3>Dear User,</h3>
                <p>Thank you for using the Ayurveda platform. To complete your authentication process, please use the following one-time password (OTP):</p>
                <h2 style="color: #4CAF50;">${otp}</h2>
                <p>This OTP is valid for 5 minutes. Please do not share it with anyone to ensure your account's security.</p>
                <p>If you did not request this OTP, please ignore this email.</p>
                <p>Best Regards,</p>
                <p>The Ayurveda Team</p>
            `
        })
        return info;
    } catch (err) {
        console.error('Error sending OTP email:', err);
    }
}
