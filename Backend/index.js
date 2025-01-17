const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DBconnect");
const { cloudinaryConnect } = require("./config/cloudinary");
const user = require("./Routes/Blog");
const fileupload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 4000;

// Security middleware setup
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '50mb' }));  // Increase as necessary

app.use(express.urlencoded({ limit: '100mb', extended: true }));

const tempDir = path.join(__dirname, "tmp");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: tempDir
}));

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}));

// Cookie parser with security options
app.use(cookieParser(process.env.COOKIE_SECRET));

// Configure secure cookie settings
app.use((req, res, next) => {
    const originalCookie = res.cookie;
    res.cookie = function(name, value, options = {}) {
        const defaultOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        };
        return originalCookie.call(this, name, value, { ...defaultOptions, ...options });
    };
    next();
});

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
    // //console..log(`Incoming Request: ${req.method} ${req.url}`);
    // //console..log("Headers:", req.headers);
    // //console..log("cookies:", req.cookies);
    next();
});

// API Routes
app.use("/api/v1", user);

// Start the server
app.listen(port, () => {
    // //console..log(`App is listening on port number ${port}`);
});
