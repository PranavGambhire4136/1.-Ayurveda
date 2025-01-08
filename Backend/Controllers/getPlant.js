const PlantInfo = require("../Models/PlantInfo");

exports.getPlantDetail = async (req, res) => {

    try {
        //console.log('stated');
        const id = req.query;
        //console.log("id", id.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required", 
            })
        }

        const plant = await PlantInfo.findOne({Name: id.id});

        if (!plant) {
            return res.status(400).json({
                success: false,
                message: "Plant not Found", 
            })
        }

        return res.status(200).json({
            success: true,
            messaege: "Plant Found",
            data: plant,
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}