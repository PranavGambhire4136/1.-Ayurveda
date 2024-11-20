const User = require("../Models/User");

exports.getUser = async (req, res) => {
    try {
        const {userId} = req.body;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Your are not loged in", 
            })
        }

        const UserDetail = await User.findById(userId);

        if (!UserDetail) {
            return res.status(400).json({
                success: false,
                message: "User Not found", 
            })
        }

        return UserDetail;
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}