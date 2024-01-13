const verifyCode = require("../models/verifyCode");
const bodyContent = require("../utils/bodyContent");
const templateEmail = require("../utils/templateEmail");
const typeVerifycode = require("../utils/typeVerifycode");
const typeVerify = require('../utils/typeVerifycode')
const nodemailer =  require('nodemailer');

const authController = {
    registerSendCode: async (req, res) => {
        try {
            const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
            const newVerifyCode = new verifyCode({
                typeOfCode: typeVerify.typeOfRegister,
                emailRequest: req.body.email,
                code: code,
                expired_time: parseInt(Date.now() + 900000)
            })
            var transporter =  nodemailer.createTransport({ // config mail server
                service: 'Gmail',
                auth: {
                    user: process.env.BUSINESS_EMAIL,
                    pass: process.env.BUSINESS_EMAIL_PASSWORD
                }
            });
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: "MATRIX'S STAFF vermillion_ft.matrix@gmail.com",
                to: req.body.email,
                subject: 'Matrix: Verify code for registering',
                text: 'Your code is: ' + code + "\nPlease don't share with anyone!!!",
                html: templateEmail(typeVerifycode.typeOfRegister, code, req.body.email, bodyContent.registerVerifyCode)
            }
            transporter.sendMail(mainOptions, async (err, info)=>{
                if (err) {
                    console.log(err);
                    res.status(500).json("Loi server");
                } else {
                    console.log('Message sent: ' +  info.response);
                    const verifyCode = await newVerifyCode.save()
                    res.status(200).json({verifyCode: verifyCode, response: info.response});
                }
            });


            
        } catch (error) {
            res.status(500).json("Server error", error)
        }

    }
}

module.exports = authController
