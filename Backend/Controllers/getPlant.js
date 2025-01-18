const PlantInfo = require("../Models/PlantInfo");

exports.getPlantDetail = async (req, res) => {
    try {
        const { id } = req.query; 

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required",
            });
        }

        const trimmedId = id.trim();

        const plant = await PlantInfo.findOne({ Name: trimmedId });

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: "Plant not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Plant found",
            data: plant,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the request",
        });
    }
};
