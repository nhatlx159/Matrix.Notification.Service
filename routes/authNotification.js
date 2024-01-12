const authController = require('../controllers/authController');

const route = require('express').Router();

route.post("/register", authController.registerSendCode);


module.exports = route
