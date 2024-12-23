const User = require("../Models/User");

exports.getUser = async (req, res) => {
    try {
        const {email} = req.query;
        // const {email} = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Your are not loged in", 
            })
        }

        console.log(email);
        
        const UserDetail = await User.findOne({email});

        if (!UserDetail) {
            return res.status(400).json({
                success: false,
                message: "User Not found", 
            })
        }

        const user = UserDetail.toObject();
        user.password = undefined;

        return res.status(200).json({    
            success: true,
            message: "User found",
            data: user,
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}