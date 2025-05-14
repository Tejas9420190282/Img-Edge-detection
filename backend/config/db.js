
// db.js -
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const url = process.env.databaseURL;  
        
        await mongoose.connect(url);
        console.log("MongoDB Connected Successfully!".bgGreen);   

        const db = mongoose.connection;


    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        console.log('Please make sure MongoDB is running and accessible');
        process.exit(1);
    }
};
 
exports.connectDB = connectDB;
