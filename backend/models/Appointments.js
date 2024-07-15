const mongoose = require('mongoose');

// creating shop schema and model
const AppointmentSchema = new mongoose.Schema(
    { 
        shopName: String,
        startTime: Number,
        duration: Number,
        date: String,
        userName: String,
        userEmail: String,
        userPhone: Number,
        services: Array,
        totalPrice: Number,
        status: String
    });
const Appointments = new mongoose.model("appointment", AppointmentSchema);

module.exports = Appointments;