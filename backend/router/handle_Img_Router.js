
// handle_Img_Router.js (Node)

const express = require('express');
const { upload, handle_Img_Controller } = require('../Controller/handle_Img_Controller');0


const handle_Img_Router = express.Router();

// Add the upload middleware here
handle_Img_Router.post("/handle-img", upload.single("image"), handle_Img_Controller); // Changed from "img" to "image"

exports.handle_Img_Router = handle_Img_Router;






