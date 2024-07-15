// importing required functions and models
const sendOtpFn = require('../functions/sendOtpFn.js');

// api to add a new user
const sendOtp = async (req, res) => {
    try {
        const response = await sendOtpFn(req.body.email, req.body.otp);
        console.log(response);
        response ? res.send(true) : res.send(false);
    } catch (error) {
        console.log(error);
        res.send(false);
    }
};

module.exports = sendOtp;