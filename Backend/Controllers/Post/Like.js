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

exports.removeLike = async (req, res) => {
    try {
        const { likeId, postId } = req.body;

        if (!likeId || !postId) {
            return res.status(400).json({
                success: false,
                message: "Like ID and Post ID are required",
            });
        }

        const like = await Like.findById(likeId);
        if (!like) {
            return res.status(400).json({
                success: false,
                message: "Invalid like",
            });
        }

        const user = req.session.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Login or signup first",
            });
        }

        if (like.user.toString() !== user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You can't remove this like",
            });
        }

        await Like.findByIdAndDelete(likeId);

        await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: like._id } }, 
            { new: true }
        );

        return res.status(200).json({
            success: true, 
            message: "Like removed successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
