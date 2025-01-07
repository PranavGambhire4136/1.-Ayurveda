const PlantInfo = require("../Models/PlantInfo");
const { uploadFilePlant } = require("./Utility/AddImage");

exports.addPlant = async (req, res) => {
    try {
        // console.log("Received data:", req.body);
        const { Name, Info, Tags, Disease, HowItWorks, SideEffects, Exceptions, Availability } = req.body;
        const Image = req.files?.Image;

        // console.log("Name:", Name);
        // console.log("Info:", Info);
        // console.log("Image:", Image);


        if (!Name || !Info || !Image) {
            return res.status(400).json({
                success: false,
                message: "Name, Image, and Info are required fields.",
            });
        }

        // Check if the plant already exists
        const isPlantExists = await PlantInfo.findOne({ Name });
        if (isPlantExists) {
            return res.status(400).json({
                success: false,
                message: "Plant already exists.",
            });
        }

        // console.log("isPlantExists", isPlantExists);
        
        const tagArray = Tags?.toString().split(",") || [];
        const diseaseArray = Disease?.toString().split(",") || [];
        const sideEffectsArray = SideEffects?.toString().split(",") || [];
        const exceptionArray = Exceptions?.toString().split(",") || [];

        
        const imageUrl = await uploadFilePlant(Image, Name);


        // Create the new plant document
        const plant = {
            Name, 
            Image: imageUrl, 
            Info, 
            Tags: tagArray, 
            Disease: diseaseArray, 
            HowItWorks, 
            SideEffects: sideEffectsArray, 
            Exceptions: exceptionArray, 
            Availability
        };

        // console.log("plant", plant);

        // Save the plant to the database
        await PlantInfo.create(plant);

        return res.status(200).json({
            success: true,
            message: "Plant added successfully.",
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};
