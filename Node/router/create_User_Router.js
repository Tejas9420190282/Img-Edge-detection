
// create_User_Router.js (Node)

const express = require('express');
const { create_User_Controller } = require('../Controller/create_User_Controller');

const create_User_Router = express.Router();

create_User_Router.post("/register", create_User_Controller)

exports.create_User_Router = create_User_Router;




