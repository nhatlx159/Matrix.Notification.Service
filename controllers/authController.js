const { default: axios } = require("axios");
const verifyCode = require("../models/verifyCode");
const bodyContent = require("../utils/bodyContent");
const templateEmail = require("../utils/templateEmail");
const templateEmailNewDevice = require("../utils/templateEmailNewDevice");
const typeVerifycode = require("../utils/typeVerifycode");
const typeVerify = require('../utils/typeVerifycode')
const nodemailer = require('nodemailer');

const authController = {
    //Send verify code for user
    registerSendCode: async (req, res) => {
        try {
            const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
            const newVerifyCode = new verifyCode({
                typeOfCode: typeVerify.typeOfRegister,
                emailRequest: req.body.email,
                code: code,
                expired_time: parseInt(Date.now() + 900000)
            })
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.BUSINESS_EMAIL,
                    pass: process.env.BUSINESS_EMAIL_PASSWORD
                }
            });
            var mainOptions = {
                from: "MATRIX'S STAFF vermillion_ft.matrix@gmail.com",
                to: req.body.email,
                subject: 'Matrix: Verify code for registering',
                text: 'Your code is: ' + code + "\nPlease don't share with anyone!!!",
                html: templateEmail(typeVerifycode.typeOfRegister, code, req.body.email, bodyContent.registerVerifyCode)
            }
            transporter.sendMail(mainOptions, async (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("Loi server");
                } else {
                    console.log('Message sent: ' + info.response);
                    const verifyCode = await newVerifyCode.save()
                    res.status(200).json({ verifyCode: verifyCode, response: info.response });
                }
            });
        } catch (error) {
            res.status(500).json("Server error", error)
        }
    },
    // Confirm Verify code from user
    confirmRegisterVerifyCode: async (req, res) => {
        try {
            const result = await verifyCode.find({ code: req.body.code })
            for (let i = 0; i < result.length; i++) {
                const ele = result[i];
                if ((ele.expired_time > Date.now()) && (req.body.email === ele.emailRequest)) {
                    return res.status(200).json(result);
                }
                continue;
            }
            return res.status(404).json({ any: "Not found verify code or code invalid!!" });
        } catch (error) {
            res.status(500).json("Server error", error)
        }
    },
    // Confirm login on new Device
    confirmLoginOnNewDevice: async (req, res) => {
        try {
            const isExisted = await axios(`http://localhost:8080/v1/auth/findaccount/${req.body.email}`)
            if(!isExisted) {
                console.log("Tài khoản chưa được đăng ký");
                return res.status(404).json({any: "Tài khoản chưa được khởi tạo"})
            }
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.BUSINESS_EMAIL,
                    pass: process.env.BUSINESS_EMAIL_PASSWORD
                }
            });
            var mainOptions = {
                from: "MATRIX'S STAFF vermillion_ft.matrix@gmail.com",
                to: req.body.email,
                subject: 'Matrix: Login on new device',
                text: 'You just logged in on new device!!!',
                html: templateEmailNewDevice(req.body.email, bodyContent.confirmNewDevice, req.body.timestamp, req.body.ipInfo, req.body.userAgent)
            }
            transporter.sendMail(mainOptions, async (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({any: "Loi server"});
                } else {
                    console.log('Message sent: ' + info.response);
                    res.status(200).json({ verifyCode: verifyCode, response: info.response });
                }
            });
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = authController
