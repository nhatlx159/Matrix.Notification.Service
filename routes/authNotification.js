const authController = require('../controllers/authController');

const router = require('express').Router();

// REGISTER
router.post("/registersendcode", authController.registerSendCode);

// CONFIRM REGISTER
router.post("/comfirmregister", authController.confirmRegisterVerifyCode);

// LOGIN IN NEW DEVICE
router.post("/loginonnewdevice", authController.confirmLoginOnNewDevice);

module.exports = router
