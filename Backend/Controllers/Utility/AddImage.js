const cloudinary = require("cloudinary").v2;
const fs = require('fs').promises;

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
        const upload = await uploadToCloud(file, 'Post');

        const toDelete = file.tempFilePath;
        const toSend = upload.secure_url;

        if (toDelete) {
            await fs.rm(toDelete);
        }

        return toSend;
    } catch (err) {
    }
};

// Exported function to upload a post file
exports.uploadPost = async (file, name) => {
    try {

        // Upload file to Cloudinary
        const upload = await uploadToCloud(file, 'Post');

        const toDelete = file.tempFilePath;
        const toSend = upload.secure_url;

        if (toDelete) {
            await fs.rm(toDelete);
        }

        return toSend;
    } catch (err) {
    }
};
