const authController = require('../controllers/authController');

const router = require('express').Router();

router.post("/register", authController.registerSendCode);
router.get("/comfirmregister", authController.confirmRegisterVerifyCode);

module.exports = router
