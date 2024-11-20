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

        postDocument.comments.push(postDocument._id);

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