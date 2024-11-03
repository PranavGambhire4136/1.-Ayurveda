const PlantInfo = require("../Models/PlantInfo");

exports.getAllPlants = async (req, res) => {
    try {
        const data = await PlantInfo.find({});
        return res.status(200).json({
            success: true,
            message: "Plant data fetched successfully",
            data: data,
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }
}