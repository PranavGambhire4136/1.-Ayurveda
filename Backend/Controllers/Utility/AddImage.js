const cloudinary = require("cloudinary");

async function uploadToCloud(file, folders) {
    // console.log("uploadTocloud", name)
    const options = {
        folder: "Home/" + folders,
    }
    // console.log(options);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.uploadFilePlant = async (file, name) => {
    try {
        // console.log("upload file",name);
        const upload = await uploadToCloud(file, 'Plants', name).catch((err) => {
            console.error(err);
        });
        return upload.secure_url;
    } catch (err) {
        console.error(err);
    }
}

exports.uploadPost = async (file, name) => {
    try {
        // console.log("upload file",name);
        const upload = await uploadToCloud(file, 'Post').catch((err) => {
            console.error(err);
        });
        return upload.secure_url;
    } catch (err) {
        console.error(err);
    }
}