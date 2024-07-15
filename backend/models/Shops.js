const mongoose = require('mongoose');

// creating shop schema and model
const shopSchema = new mongoose.Schema(
    { 
        ownerName: String,
        shopName: String,
        email: String,
        password: String,
        phone: Number,
        address : String,
        latitude: Number,
        longitude: Number,
        services: Array
    });
const Shops = new mongoose.model("shop", shopSchema);

module.exports = Shops;