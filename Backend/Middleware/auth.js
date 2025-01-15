require("dotenv").config();
const {jwtDecode} = require("jwt-decode");

exports.isAdmin = async (req, res, next) => {
    try {
        //console.log("admin Checking", req.cookies?.token);

        const token = req.cookies?.token;
        if (token) {
            const user = jwtDecode(token);
    
            //console.log(user);
    
            if (user && user.type == "Admin") {
                //console.log('admin');
                next();
            }else {
                return res.status(400).json({
                    success: false,
                    message: "This route is only for admin", 
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Your are not loged in", 
            })
        }
    } catch (err) {
        //console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.isUser = async (req, res, next) => {
    try {
        // //console.log(req.session.user.type);

        const token = req.cookies?.token;

        if (token) {
            const user = jwtDecode(token);
    
            //console.log(user);
    
            if (user && user.type == "User") {
                //console.log('user');
                next();
            }else {
                return res.status(400).json({
                    success: false,
                    message: "This route is only for User", 
                })
            }
        } else {
            return res.status(400).json({    
                success: false,
                message: "Your are not loged in", 
            })
        }
    } catch (err) {
        //console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.isOwner = async (req, res, next) => {
    try {
        // //console.log(req.session.user.type);

        const token = req.cookies?.token;

        if (token) {
            const user = jwtDecode(token);
    
            //console.log(user);
    
            if (user && user.type == "Owner") {
                //console.log('owner');
                next();
            }else {
                return res.status(400).json({    
                    success: false,
                    message: "This route is only for Owners", 
                })
            }
        } else {
            return res.status(400).json({    
                success: false,
                message: "Your are not loged in",  
            })
        }
    } catch (err) {
        //console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong", 
        })
    }
}

exports.isThere = async(req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log("isThere middleware");
        // //console.log('cookie: ', req.cookies);
        // //console.log('token: ', req.cookies?.token);
        
        if (token) {
            // //console.log('main there start');
            const user = jwtDecode(token);
            // //console.log(user);
            req.user = user;
            // //console.log("isThere over here");
            next();
        } else {
            // //console.log('not there');
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