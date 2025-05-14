
// main.js (Node)

const express = require('express');
const colors = require('colors');
const { connectDB } = require('./config/db');
const { create_User_Router } = require('./router/create_User_Router');
const { login_Router } = require('./router/login_Router');
const cors = require('cors');
const { handle_Img_Router } = require('./router/handle_Img_Router');
const { route } = require('./router/borderRoutes.js');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:5173", Credential:true}));

app.use(create_User_Router);
app.use(login_Router);
app.use(handle_Img_Router);
app.use(route)

const PORT = 1212;

// Connect to DB first, then start server

connectDB();  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.bgGreen);
});
 



