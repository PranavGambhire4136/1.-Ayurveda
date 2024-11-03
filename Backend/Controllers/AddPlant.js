const PlantInfo = require("../Models/PlantInfo");

exports.addPlant = async (req, res) => {
    try {
        const {Name, Image, Info, Tags, Disease, HowItWorks, SideEffects, Exception, Availability} = req.body;

        if (!Name || !Image || !Info) {
            return res.status(400).json({
                success: false,
                message: "Please filed all the required fields", 
            })
        }

        const isPlantExits = await PlantInfo.findOne({Name});
        if (isPlantExits) {
            return res.status(400).json({
                success: false,
                message: "Plant already exits", 
            })
        }

        const plant = {
            Name, Image, Info, Tags, Disease, HowItWorks, SideEffects, Exception, Availability
        }

        const plantInformation = await PlantInfo.create(plant);

        return res.status(200).json({
            success: true,
            message: "Plant Added Successfully", 
        })
    } catch(err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}