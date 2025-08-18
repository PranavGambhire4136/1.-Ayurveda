const express = require("express");
const router = express.Router();
const { SignUp } = require("../Controllers/Authz/Signup");
const { verifyOtpAndCreateUser } = require("../Controllers/Authz/VerifyOTPAndCreateUser");
require('dotenv').config();
const { Login, logout } = require("../Controllers/Authz/Login");
const { getAllPlants } = require("../Controllers/GetAllPlant");
const { addPlant } = require("../Controllers/AddPlant");
const { addPost, deletePost, getAllPost } = require("../Controllers/Post/Post");
const { addLike, removeLike, isLike } = require("../Controllers/Post/Like");
const { addDisLike, removeDisLike, isDisLiked } = require("../Controllers/Post/DisLike");
const { isAdmin, isThere, isOwner } = require("../Middleware/auth");
const { changePasskey } = require("../Controllers/changePasskey");
const { getUser } = require("../Controllers/GetUserData");
const { getPlantDetail } = require("../Controllers/getPlant");
const { getPost } = require("../Controllers/Authz/GetPost");
const { addProfile } = require("../Controllers/Authz/AddProfile");
const { getAddDetails, AddDetail } = require("../Controllers/Authz/AdditionalDetail");

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post("/addProfile", isThere, addProfile); //
router.get("/getAddDetial", isThere, getAddDetails); //
router.post("/addDetails", isThere, AddDetail); //

router.post("/SignUpInit", SignUp) //
router.post("/SignUpComplete", verifyOtpAndCreateUser); //
router.get("/login", Login); //
router.get("/getUser", isThere, getUser); //
router.get("/logOut", isThere, logout) //
router.post("/changePasskey", isAdmin, changePasskey); //


router.get("/getAllPlant", getAllPlants); //
router.post("/addPlant", isAdmin, addPlant); //
router.get("/getPlantDetail", getPlantDetail); //


router.post("/addPost", isThere, addPost); //
router.post("/removePost", deletePost); //
router.get("/getAllPost", getAllPost); //
router.get("/getUserPost", isThere, getPost); //

router.post("/giveLike",isThere, addLike); //
router.post("/removeLike",isThere, removeLike); //
router.get('/isLike', isThere, isLike); //

router.post('/addDisLike', isThere, addDisLike); //
router.post('/removeDisLike', isThere, removeDisLike); //
router.get('/isDisLike', isThere, isDisLiked); //

router.get("/dummy", (req, res) => {
    return res.status(200).json({ success: true, message: "Dummy" });
});

module.exports = router;
