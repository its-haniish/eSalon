const mongoose = require('mongoose');

// creating shop schema and model
const userSchema = new mongoose.Schema(
    { 
        userName: String,
        email: String,
        password: String,
        phone: Number
    });
const Users = new mongoose.model("user", userSchema);

module.exports = Users;
