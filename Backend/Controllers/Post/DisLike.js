const DisLike = require("../../Models/DisLike");
const Post = require("../../Models/Post");


exports.addDisLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const existingDisLike = await DisLike.findOne({ post: postId, user: userId });
        if (existingDisLike) {
            return res.status(400).json({
                success: false,
                message: "You have already disliked this post",
            });
        }

        const disLike = new DisLike({ post: postId, user: userId }); 
        await disLike.save();
        return res.status(200).json({
            success: true,
            message: "Dislike added successfully",
        });
    } catch (error) {
        // //console..errror(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

exports.removeDisLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        if (!userId) {  
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const disLike = await DisLike.findOne({ post: postId, user: userId });
        if (!disLike) {
            return res.status(400).json({
                success: false,
                message: "You have not disliked this post",
            });
        }

        await DisLike.findOneAndDelete({ post: postId, user: userId });
        return res.status(200).json({
            success: true,
            message: "Dislike removed successfully",
        });
    } catch (error) {
        // //console..errror(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

exports.isDisLiked = async (req, res) => {
    try {
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

        const existingDisLike = await DisLike.findOne({ post: postId, user: user.id });
        // //// //console..log("existingDisLike", existingDisLike); 


        const allDisLikes = await DisLike.countDocuments({ post: postId });

        if (existingDisLike) {
            return res.status(200).json({
                success: true,
                isDisliked: true,
                dislikeId: existingDisLike._id,
                totalDisLikes: allDisLikes,
                message: "You have disliked this post",
            });
        }


        return res.status(200).json({
            success: true,
            isDisliked: false,
            totalDisLikes: allDisLikes,
            // dislikeId: existingDisLike._id,
            message: "You have not disliked this post",
        });
    } catch (error) {
        // //console..errror(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};