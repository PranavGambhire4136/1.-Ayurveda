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

app.use(express.json());

// CORS configuration
const allowedOrigins = ["http://localhost:5137", "http://localhost:5173"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allows cookies to be sent
}));

// Ensure the temporary file upload directory exists
const tempDir = path.join(__dirname, "tmp");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
});

// File upload middleware
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: tempDir
}));

app.use(cookieParser());

// Session setup
app.use(session({
    secret: process.env.PRIVATE_KEY || "default_secret", // Fallback if PRIVATE_KEY is undefined
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false // Set to true for HTTPS
    }
}));

connectDB();
cloudinaryConnect();

// API Routes
app.use("/api/v1", user);

// Start the server
app.listen(port, () => {
    console.log(`App is listening on port number ${port}`);
});
