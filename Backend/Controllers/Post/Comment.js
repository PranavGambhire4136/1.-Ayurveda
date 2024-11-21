const Comment = require("../../Models/Comment");
const Post = require('../../Models/Post');

exports.addComment = async (req, res) => {
    try {
        const {post, commentContent} = req.body;
        if (!post || !commentContent) {
            return res.status(400).json({
                success: false,
                message: "All Fields required", 
            })
        }

        const user = req.session.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "log in or sign Up first",
            })
        }

        const postDocument = await Post.findById(post);

        if (!postDocument) {
            return res.status(400).json({
                success: false,
                message: "Post not found", 
            })
        }

        const comment = await Comment.create({post, user, commentContent});

        postDocument.comments.push(comment._id);

        await postDocument.save();

        return res.status(200).json({
            success: true,
            message: "Comment added successfully", 
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { commentId, postId } = req.body;

        if (!commentId || !postId) {
            return res.status(400).json({
                success: false,
                message: "Comment ID and Post ID are required",
            });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment",
            });
        }

        const user = req.session.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please login or signup first",
            });
        }

        if (comment.user.toString() !== user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You can't delete this comment",
            });
        }

        await Comment.findByIdAndDelete(commentId);

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: commentId } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(400).json({
                success: false,
                message: "Post not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
