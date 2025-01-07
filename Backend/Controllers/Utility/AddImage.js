const cloudinary = require("cloudinary").v2;
const fs = require("fs"); // Node.js built-in module

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload to Cloudinary
async function uploadToCloud(file, folders) {
    const options = {
        folder: "Home/" + folders,
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Exported function to upload a plant file
exports.uploadFilePlant = async (file, name) => {
    try {
        // Upload file to Cloudinary
        const upload = await uploadToCloud(file, 'Plants');
        
        // Delete the file from the server
        if (file.tempFilePath) {
            fs.unlink(file.tempFilePath, (err) => {
                if (err) {
                    console.error("Error deleting temp file:", err);
                } else {
                    console.log("Temp file deleted:", file.tempFilePath);
                }
            });
        }

        return upload.secure_url;
    } catch (err) {
        console.error("Error in uploadFilePlant:", err);
    }
};

// Exported function to upload a post file
exports.uploadPost = async (file, name) => {
    try {
        // Upload file to Cloudinary
        const upload = await uploadToCloud(file, 'Post');

        // Delete the file from the server
        if (file.tempFilePath) {
            fs.unlink(file.tempFilePath, (err) => {
                if (err) {
                    console.error("Error deleting temp file:", err);
                } else {
                    console.log("Temp file deleted:", file.tempFilePath);
                }
            });
        }

        return upload.secure_url;
    } catch (err) {
        console.error("Error in uploadPost:", err);
    }
};
