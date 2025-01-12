const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DBconnect");
const { cloudinaryConnect } = require("./config/cloudinary");
const user = require("./Routes/Blog");
const session = require("express-session");
const fileupload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: '50mb' }));  // Increase as necessary

app.use(express.urlencoded({ limit: '100mb', extended: true }));

const tempDir = path.join(__dirname, "tmp");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: tempDir
}));


app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: "https://ayur-lens-p5glcvecp-pranavgambhire4136s-projects.vercel.app/",
    credentials: true, // Allows cookies to be sent
}));

// Ensure the temporary file upload directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}



// Session setup
// app.use(session({
//     secret: process.env.PRIVATE_KEY,
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // Set to true for HTTPS
//         maxAge: 1000 * 60 * 60 * 24, // 1 day
//     }
// }));


// Your other routes and middleware...
connectDB();
cloudinaryConnect();


app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
});

// API Routes
app.use("/api/v1", user);

// Start the server
app.listen(port, () => {
    console.log(`App is listening on port number ${port}`);
});
