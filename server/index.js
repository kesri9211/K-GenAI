import cors from 'cors';
import express from 'express';
import mongoose, { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import PostRouter from './routes/Post.js';
import GenerateImageRouter from './routes/GenerateImage.js';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json({limit:"50mb"})); // Enable JSON parsing and can pass payload up to 50mb
app.use(express.urlencoded({extended: true})); // Enable URL encoded parsing 

//error handling
app.use((err, req, res, next) => {
    const status=err.status || 500;
    const message=err.message || 'Something went wrong';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

//routes
app.use("/api/post", PostRouter);
app.use("/api/generate-image", GenerateImageRouter);

//default get
app.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the API"
    });
});

// function to Connect to MongoDB
const connectDB=()=>{
    mongoose.set("strictQuery",true);
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => {
            console.error("failed to connect to MongoDB", err);
        });
}

// function to start the server
const startServer = async () => {
    try {
        // Connect to MongoDB
        connectDB();
        // Start the server
        app.listen(8000, () => console.log(`Server is running on port 8000`));
    } catch (error) {
        console.log(error);
    }
};
startServer();

