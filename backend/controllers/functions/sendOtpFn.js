const nodemailer = require('nodemailer');
const Users = require('../../models/Users.js');

const sendOtpFn = async (to, otp) => {
    return new Promise(async (resolve, reject) => {
        let response = await Users.findOne({ "email": to });
        
        if (response !== null) {
            console.log("Sending forget OTP to " + to);
        } else {
            console.log("Sending registration OTP to " + to);
        }

        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "starfish.portfolios@gmail.com",
                pass: "lzzrxvbyaoynukze"
            }
        });

        let options = {
            from: "eSalon",
            to: to,
            subject: response !== null ? "eSalon OTP Verification" : "eSalon OTP Verification",
            html: `<h1> Your Otp is ${otp}.</h1>`
        };

        mailTransporter.sendMail(options, (err) => {
            if (err) {
                console.log(`Failed to send ${otp}`);
                reject(err);
            } else {
                console.log(`${otp} sent successfully to ${to}`);
                resolve(true);
            }
        });
    });
};

module.exports = sendOtpFn;
