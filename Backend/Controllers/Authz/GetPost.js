const Post = require("../../Models/Post");

exports.getPost = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Login first",
            });
        }

        const posts = await Post.find({ user: user.id });

        return res.status(200).json({
            success: true,
            message: "Post data fetched successfully",
            data: posts,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }
}