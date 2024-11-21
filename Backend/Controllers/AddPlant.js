const PlantInfo = require("../Models/PlantInfo");
const { uploadFilePlant } = require("./Utility/AddImage");

exports.addPlant = async (req, res) => {
    try {
        const {Name, Info, Tags, Disease, HowItWorks, SideEffects, Exception, Availability} = req.body;
        const Image = req.files.PlantImage;

        if (!Name || !Image || !Info) {
            return res.status(400).json({
                success: false,
                message: "all filed are required", 
            })
        }

        const isPlantExits = await PlantInfo.findOne({Name});
        if (isPlantExits) {
            return res.status(400).json({
                success: false,
                message: "Plant already exits", 
            })
        }

        const imageUrl = await uploadFilePlant(Image, Name);
        // console.log(imageUrl);

        const plant = {
            Name, Image: imageUrl, Info, Tags, Disease, HowItWorks, SideEffects, Exception, Availability
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