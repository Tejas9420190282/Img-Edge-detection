
// login_Controller.js (Node)

const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const login_Controller = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log(`All the inputs are mandatory`.bgRed);
            return res.status(400).json({
                success: false,
                message: `All the inputs are mandatory`,
            });
        }

        console.log(`Input Password : ${password}`);
        
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log("User not found, please create an account.".bgRed);
            return res.status(401).json({
                success: false,
                message: "User not found, please create an account.",
            });
        }

        console.log("Stored Password (Hashed):", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);
    
        if (!isMatch) {
            console.log("Invalid Password....".bgRed);
            return res.status(401).json({
                success: false,
                message: "Invalid Password....",
            });
        }

        const SECRET_KEY = "secret-key";

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        console.log("Successfully Logged in as User!".bgGreen);

        res.status(200).json({
            success: true,
            message: "Successfully logged in!",
            token,
            userName: user.name,
            redirect : "/user/home"
        });

    } catch (error) {
        console.log(`Error in login_Controller API ${error.message}`.bgRed);
        res.status(400).json({
            success: false,
            message: `Error in login_Controller API ${error.message}`,
        });
    }
};


exports.login_Controller = login_Controller;








