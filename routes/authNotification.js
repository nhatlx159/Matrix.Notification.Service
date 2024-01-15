const authController = require('../controllers/authController');

const router = require('express').Router();

router.post("/register", authController.registerSendCode);
router.post("/comfirmregister", authController.confirmRegisterVerifyCode);
router.post("/loginonnewdevice", authController.confirmLoginOnNewDevice);

module.exports = router
