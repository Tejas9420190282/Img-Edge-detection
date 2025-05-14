
// db.js -
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = "mongodb+srv://root:root@mongodb.mgc99hl.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB";  
        
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
