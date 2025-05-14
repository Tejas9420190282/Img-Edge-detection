
// create_User_Controller.js (Node)

const User = require("../Models/User");
const bcrypt = require('bcrypt');

const create_User_Controller = async (req, res) => {
    try {
        const {name, email, password} = req.body;

         // Debug: Log the plain password before hashing
        console.log('Original password:', password);

        const existUser = await User.findOne({ email });

        if (existUser) {

            console.log("User is already have account, please create new account".bgRed);

            return res.status(400).json({
                
                success : false,
                message : "User is already have account, please create new account"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password : hashPassword});

        // Debug: Log the stored user document
        console.log(`Created user: ${user}`);

        console.log("Successfully inserted the User details".bgGreen);

        res.status(201).json({
            success : true,
            message : "Successfully inserted the User details"
        })
        
    } catch (error) {
        
        console.log(`Error in create_User_Controller API ${error.message}`.bgRed);

        res.status(500).json({
            success : false,
            message : `Error in create_User_Controller API ${error.message}`,
        })
    }
}

exports.create_User_Controller = create_User_Controller;