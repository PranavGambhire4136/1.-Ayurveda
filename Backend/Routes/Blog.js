const express = require("express");
const router = express.Router();
const { SignUp } = require("../Controllers/Authz/Signup");
const {verifyOtpAndCreateUser} = require("../Controllers/Authz/VerifyOTPAndCreateUser");
require('dotenv').config();
const { Login, logout } = require("../Controllers/Authz/Login");
const { getAllPlants } = require("../Controllers/GetAllPlant");
const { addPlant } = require("../Controllers/AddPlant");
const {addPost, deletePost} = require("../Controllers/Post/Post");
const { addLike, removeLike } = require("../Controllers/Post/Like");
const { addComment, deleteComment } = require("../Controllers/Post/Comment");
const {isAdmin, isThere} = require("../Middleware/auth");

router.get("/", (req, res) => {
    res.send("Hello World");
})

router.post("/SignUpInit", SignUp); //verify once 
router.post("/SignUpComplete", verifyOtpAndCreateUser);
router.get("/login", Login);

router.get("/getAllPlant", getAllPlants);
router.post("/addPlant", isAdmin, addPlant);
router.post("/addPost", addPost);
router.post("/removePost", deletePost)
router.post("/giveLike", addLike);
router.post("/removeLike", removeLike);
router.post("/addComment", addComment);
router.post("/removeComment", deleteComment);
router.get("/logOut", isThere, logout);

module.exports = router;