const Post = require('../../Models/Post');
const User = require("../../Models/User");

exports.addPost = async(req, res) => {


    try {
        // console.log("Checking", req.session.user);
        const {postHeading, postContent} = req.body;
        //  const postImage = req.files.postImage;
        //  console.log(postImage);

        
        if (!postContent || !postHeading) {
            return res.status(400).json({
                success: false,
                message: "All The fields are required", 
            })
        }
        
        // console.log("controller", req.session.user);
        const user = req.session.user;
        // console.log("user", user);
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
        const post = await Post.create({postHeading, postContent});
        UserDetail.post.push(post._id);

        await UserDetail.save();
        // console.log("User: ", UserDetail);
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