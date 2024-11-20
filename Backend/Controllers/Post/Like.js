const Like = require("../../Models/Likes");
const Post = require('../../Models/Post');

exports.addLike = async (req, res) => {
    try {
        const { post } = req.body;

        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const user = req.session.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please log in or sign up first",
            });
        }

        const existingLike = await Like.findOne({ post, user });
        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "You have already liked this post",
            });
        }

        const postDocument = await Post.findById(post);
        if (!postDocument) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const newLike = await Like.create({ post, user });
        if (!newLike) {
            return res.status(500).json({
                success: false,
                message: "Failed to add like",
            });
        }

        postDocument.likes.push(newLike._id);

        await postDocument.save();

        return res.status(200).json({
            success: true,
            message: "Like added successfully",
        });
    } catch (err) {
        console.error("Error:", err.stack || err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
