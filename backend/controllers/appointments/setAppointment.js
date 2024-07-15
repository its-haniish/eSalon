// importing required models
const Appointments = require("../../models/Appointments");

const setAppointment = async (req, res) => {
    try {
        const request = req.body;
        // Adjusting the query to check for existing appointments within the given time slot
        let appointments = await Appointments.findOne({
            shopName: request.shopName,
            startTime: request.startTime,
            date: request.date
        });

        if (appointments) {
            console.log("Appointment already exists");
            res.send(false);
        } else {
            let response = await Appointments.create(request);
            response ? console.log(`New Appointment created by ${request.username} for ${request.shopName} on ${request.date}`) : console.log("Appointment not created");
            response ? res.send(true) : res.send(false);
        }
    } catch (error) {
        console.log(error);
        res.send(false);
    }
}

module.exports = setAppointment;
