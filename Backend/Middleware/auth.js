require("dotenv").config();

exports.isAdmin = async (req, res, next) => {
    try {
        console.log("admin Checking",req.session);

        if (req.session.user && req.session.user.type == "Admin") {
            console.log('admin');
            next();
        }else {
            return res.status(400).json({
                success: false,
                message: "This route is only for admin", 
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.isUser = async (req, res, next) => {
    try {
        // console.log(req.session.user.type);

        if (req.session.user && req.session.user.type == "User") {
            next();
        }else {
            return res.status(400).json({
                success: false,
                message: "This route is only for User", 
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.isOwner = async (req, res, next) => {
    try {
        // console.log(req.session.user.type);

        if (req.session.user && (req.session.user.type == "Admin" && req.session.user.email == "pranavgambhire9890@gmail.com")) {
            next();
        }else {
            return res.status(400).json({
                success: false,
                message: "This route is only for Owners", 
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.isThere = async(req, res, next) => {
    try {
        const user = req.cookies?.token;
        console.log('cookie: ', req.cookies);
        req.user = user;
        if (user) {
            next();
        } else {
            return res.status(400).json({
                success: false,
                message: "Your are not loged in", 
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}