const Like = require("../../Models/Likes");
const Post = require('../../Models/Post');

exports.addLike = async (req, res) => {
    try {
        // //// //console..log(req.body);
        const { post } = req.body;

        // //// //console..log(post);

        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please log in or sign up first",
            });
        }

        // //// //console..log("user", user);
        
        const postDocument = await Post.findById(post);
        if (!postDocument) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const existingLike = await Like.findOne({ post, user:user.id });

        // //// //console..log("already", existingLike)
        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "You have already liked this post",
            });
        }

        // //// //console..log("postDocument", postDocument);

        const newLike = await Like.create({ post, user: user.id });
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
            likeid: newLike._id,
            message: "Like added successfully",
        });
    } catch (err) {
        // //console..errror("Error:", err.stack || err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

exports.removeLike = async (req, res) => {
    try {
        // //// //console..log(req.body);
        const { likeId, postId } = req.body;

        if (!likeId || !postId) {
            return res.status(400).json({
                success: false,
                message: likeId ? "Post ID is required" : "Like ID is required",
            });
        }

        const like = await Like.findById(likeId);
        if (!like) {
            return res.status(400).json({
                success: false,
                message: "Invalid like",
            });
        }

        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Login or signup first",
            });
        }

        if (like.user.toString() !== user.id.toString()) {
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
        // //console..errror(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

exports.isLike = async (req, res) => {
    try {
        // //// //console..log(req.query);
        const { postId } = req.query;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please log in or sign up first",
            });
        }

        const existingLike = await Like.findOne({ post: postId, user: user.id })
        // //// //console..log("existingLike", existingLike);

        
        const allLikes = await Like.countDocuments({ post: postId });

        if (existingLike) {
            return res.status(200).json({
                success: true,
                isLiked: true,
                likeId: existingLike._id,
                likeCount: allLikes,
                message: "You have liked this post",
            });
        }

        return res.status(200).json({
            success: true,
            isLiked: false,
            likeCount: allLikes,
            message: "You have not liked this post",
        });
    } catch (err) {
        // //console..errror("Error:", err.stack || err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
