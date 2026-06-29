import mongoose from "mongoose";

function connectDB() {
    
    mongoose.connect(`${process.env.MONGO_URI}/Real-Time-Chat-App`)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.log(err);
        })
}

export default connectDB;