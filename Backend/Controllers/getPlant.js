const PlantInfo = require("../Models/PlantInfo");

exports.getPlantDetail = async (req, res) => {
    try {
        console.log('Started processing plant detail request');
        
        const { id } = req.query; // Extract 'id' from the query parameters

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required", 
            });
        }

        // Query to check if Name matches or tag array contains the id
        const plant = await PlantInfo.findOne({
            $or: [
                { Name: id },
                { tag: { $elemMatch: { $regex: id, $options: 'i' } } } // Case-insensitive match for substring
            ]
        });


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
        console.error('Error while fetching plant details:', err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the request", 
        });
    }
};
