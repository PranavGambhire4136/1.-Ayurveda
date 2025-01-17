const AdminSettings = require("../Models/adminSetting");
const bcrypt = require("bcrypt");
const User = require("../Models/User");

exports.changePasskey = async (req, res) => {
    try {
        const {newPasskey} = req.body;

        if (!newPasskey) {
            return res.status(400).json({
                success: false,
                message: "newPasskey is required", 
            })
        }

        // const user = req.user;
        // if (!user) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "login or signup first", 
        //     })
        // }

        // const userDetail = await User.findById(user.id);
        // if (!userDetail) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid user", 
        //     })
        // }

        const encrpitedPasskey = await bcrypt.hash(newPasskey, 10);

        if (!encrpitedPasskey) {
            return res.status(400).json({
                success: false,
                message: "new passkey can't encript",
            })
        }


        const data = await AdminSettings.findOne();

        if (!data) {
            const dat = await AdminSettings.create({
                passkey: encrpitedPasskey,
            });

            return res.status(200).json({
                success: true,
                message: "PassKey changed successfully", 
            })
        }

        data.passkey = encrpitedPasskey;
        await data.save();

        // //console..log(data.passkey);

        return res.status(200).json({
            success: true,
            message: "PassKey changed successfully", 
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}