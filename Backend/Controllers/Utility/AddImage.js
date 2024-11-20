exports.uploadFilePlant = async (file) => {
    try {
        const upload = await uploadToCloud(file, 'Plants').catch((err) => {
            console.error(err);
            res.status(400).json({
                success: false,
                message: 'cloudinary upload failed',
            })
        });
        return upload.secure_url;
    } catch (err) {
        console.error(err);
    }
}

exports.uploadPost = async (file) => {
    try {
        const upload = await uploadToCloud(file, 'Post').catch((err) => {
            console.error(err);
            res.status(400).json({
                success: false,
                message: 'cloudinary upload failed',
            })
        });
        return upload.secure_url;
    } catch (err) {
        console.error(err);
    }
}