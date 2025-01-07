const AdditionalDetail = require('../../Models/AdditionalDetail');
const User = require("../../Models/User");

exports.getAddDetails = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "You are not logged in",
            })
        }

        const userDetail = await User.findById(user.id);
        if (!userDetail) {
            return res.status(400).json({
                success: false,
                message: "Invalid User", 
            })
        }
        console.log("id", userDetail);

        const addDetial = await AdditionalDetail.findById(userDetail.additionalDetail);

        if (!addDetial) {
            return res.status(400).json({
                success: false,
                message: "Detail can't be fetched", 
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Detail get successFully', 
            data: addDetial,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: "false",
            message: "Something Went Wrong", 
        })
    }
}
exports.AddDetail = async (req, res) => {
    try {
        const { phoneNo, DOB, Address } = req.body;

        if (!phoneNo && !DOB && !Address) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required",
            });
        }

        const user = req.user;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "You are not logged in",
            });
        }

        const userDetail = await User.findById(user.id);
        if (!userDetail) {
            return res.status(400).json({
                success: false,
                message: "Invalid User",
            });
        }

        // Check if the user already has additional details
        if (userDetail.additionalDetail) {
            await AdditionalDetail.findByIdAndDelete(userDetail.additionalDetail);
        }

        // Create new additional details
        const addDetail = await AdditionalDetail.create({
            phone: phoneNo,
            DOB,
            address: Address,
        });

        if (!addDetail) {
            return res.status(400).json({
                success: false,
                message: "Detail can't be added",
            });
        }

        // Link the new details to the user
        userDetail.additionalDetail = addDetail._id;
        await userDetail.save();

        return res.status(200).json({
            success: true,
            message: 'Detail added successfully',
            data: addDetail,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
