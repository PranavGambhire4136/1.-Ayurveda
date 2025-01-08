const User = require("../../Models/User");
const AdditionalDetail = require("../../Models/AdditionalDetail");
const { uploadPost } = require("../Utility/AddImage");

exports.addProfile = async (req, res) => {
    try {
        //console.log('Starting');
        const {file} = req.files;

        //console.log(file);
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Profile pic is required",
            });
        }

        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Login or signup first",
            });
        }

        const userDetail = await User.findById(user.id);
        if (!userDetail) {
            return res.status(400).json({
                success: false,
                message: "Invalid user",
            });
        }

        //console.log('stated');

        const profileUrl = await uploadPost(file, "Profile");


        //console.log('ended');
        if (!profileUrl) {
            return res.status(400).json({
                success: false,
                message: "Failed to upload profile pic",
            });
        }


        userDetail.profile = profileUrl;
        await userDetail.save();
        return res.status(200).json({
            success: true,
            message: "Profile pic added successfully",
        });
    } catch (err) {
        //console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}