const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/DBconnect");
const { cloudinaryConnect } = require("./config/cloudinary");
const user = require("./Routes/Blog");
const session = require("express-session");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.PRIVATE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        secure: false 
    }
}));

connectDB();
cloudinaryConnect();

const fileupload = require("express-fileupload");
const { addPost } = require("./Controllers/Post/Post");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));  //uploads the data on the server and then cloudinary uploads the data on cloudinary

app.use("/api/v1", user);

app.listen(port, () => {
    console.log("App is listing on port number" + port);
})