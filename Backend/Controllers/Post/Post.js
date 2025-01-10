const Post = require('../../Models/Post');
const User = require("../../Models/User");
const Like = require("../../Models/Likes");
const { uploadPost } = require('../Utility/AddImage');
const DisLike = require('../../Models/DisLike');

exports.addPost = async(req, res) => {
    try {
        // //console.log("Checking", req.user);
        const {postHeading, postContent} = req.body;
        //console.log("PostHeading and content",postHeading, postContent);
        //console.log("files: ", req.files);
         const postImage = req.files?.postImage;
        //  //console.log(req.files);
         //console.log("PostImage: ", postImage);

        
        if (!postContent || !postHeading || !postImage) {
            return res.status(400).json({
                success: false,
                message: "All The fields are required", 
            })
        }
        
        // //console.log("controller", req.user);
        const user = req.user;
        // //console.log("user", user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Login or signup first",
            })
        }
    
        const UserDetail = await User.findOne({email: user.email});
        if (!UserDetail) {
            return res.status(400).json({
                success: false,
                message: "Invalid user", 
            })
        }

        const imageUrl = await uploadPost(postImage, postHeading);
        const post = await Post.create({postHeading, postContent, postImage: imageUrl, user: UserDetail._id});
        UserDetail.post.push(post._id);

        await UserDetail.save();
        // //console.log("User: ", UserDetail);
        return res.status(200).json({
            success: true,
            message: "Post created successfully", 
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

exports.deletePost = async(req, res) => {
    try {
        const {postId} = req.body;
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required", 
            })
        }
    
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(200).json({
                success: false,
                message: "Inavalid post", 
            })
        }

        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: true,
                message: "Login or signup first", 
            })
        }
        // //console.log("user",user._id);
        // //console.log("post", post.user);

        if (!(post.user.toString() == user._id.toString())) {
            return res.status(400).json({
                success: false,
                message: "You don't have access to delete this post", 
            })
        }
    
        const deletePost = await Post.findByIdAndDelete(postId);
        //console.log("delete", deletePost);

        await DisLike.deleteMany({ post: postId }, { session });

        await Like.deleteMany({ post: postId }, { session });

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { post: post._id } }, // Remove post._id from the user's post array
            { new: true } // Return the updated user document
        );
    
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully", 
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.getAllPost = async (req, res) => {
    try {
        const data = await Post.find({}).populate('user');

        if (!data) {
            return res.status(400).json({
                success: false,
                message: "No post found",
            })
        }
        
        data.forEach(post => {
            if (post.user) {
                post.user.password = undefined;
            }
        });

        return res.status(200).json({
            success: true,
            message: "Post data fetched successfully",
            data: data,
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong from getAllPost",
        })
    }
}