const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/DBconnect");
const { cloudinaryConnect } = require("./config/cloudinary");
const user = require("./Routes/Blog");
const session = require("express-session");
const fileupload = require("express-fileupload");

const app = express();
const port = process.env.PORT;

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})); 
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


app.use("/api/v1", user);

app.listen(port, () => {
    console.log("App is listing on port number" + port);
})