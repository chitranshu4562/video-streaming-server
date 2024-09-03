import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import initializeRoutes from "./routes/index.js";

// load .env file
dotenv.config();

const app = express();

// Enable cors for all options
app.use(cors());

// Handle json data
app.use(bodyParser.json());

// Initialize all routes
initializeRoutes(app);

// Handle all errors
app.use((error, req, res, next) => {
    // print error for better debugging
    console.error(error);
    res.status(error.status || 500);
    res.json({
        success: false,
        message: error.message ? error.message : error
    })
})

mongoose.connect('mongodb://localhost:27017/video-streaming-platform-db').then((result) => {
    console.log('Database is connected');
    app.listen(8080, () => {
        console.log('App server is running at port 8080');
    });
}).catch(error => {
    console.error(error);
});
