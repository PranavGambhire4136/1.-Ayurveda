const express = require("express");
const { SignUp } = require("./Controllers/Authz/Signup");
const {verifyOtpAndCreateUser} = require("./Controllers/Authz/VerifyOTPAndCreateUser");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/DBconnect");
const { Login } = require("./Controllers/Authz/Login");
const { getAllPlants } = require("./Controllers/GetAllPlant");
const { addPlant } = require("./Controllers/AddPlant");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/api/SignUpInit", SignUp);
app.post("/api/SignUpComplete", verifyOtpAndCreateUser);
app.get("/api/login", Login);

app.get("/api/getAllPlant", getAllPlants);
app.post("/api/addPlant", addPlant);

app.listen(port, () => {
    console.log("App is listing on port number" + port);
})