const express = require("express");
const router = express.Router();
const { SignUp } = require("../Controllers/Authz/Signup");
const { verifyOtpAndCreateUser } = require("../Controllers/Authz/VerifyOTPAndCreateUser");
require('dotenv').config();
const { Login, logout } = require("../Controllers/Authz/Login");
const { getAllPlants } = require("../Controllers/GetAllPlant");
const { addPlant } = require("../Controllers/AddPlant");
const { addPost, deletePost, getAllPost } = require("../Controllers/Post/Post");
const { addLike, removeLike } = require("../Controllers/Post/Like");
const { isAdmin, isThere, isOwner } = require("../Middleware/auth");
const { changePasskey } = require("../Controllers/changePasskey");
const { getUser } = require("../Controllers/GetUserData");

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post("/SignUpInit", SignUp); //verify once
router.post("/SignUpComplete", verifyOtpAndCreateUser);
router.get("/login", Login);
router.get("/getUser", isThere, getUser);

router.get("/getAllPlant", getAllPlants);
router.post("/addPlant", isAdmin, addPlant);  // Route for adding a plant
router.post("/addPost", isThere, addPost);
router.post("/removePost", deletePost);
router.get("/getAllPost", getAllPost);
router.post("/giveLike", addLike);
router.post("/removeLike", removeLike);
router.get("/logOut", isThere, logout); //add isThere midddleware

router.post("/changePasskey", isOwner, changePasskey);

module.exports = router;
