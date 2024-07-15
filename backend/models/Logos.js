const mongoose = require('mongoose');

// schema and model for image
const logoSchema = new mongoose.Schema({
    email: String,
    logo: String
})
const Logos = new mongoose.model('logo', logoSchema);

module.exports = Logos;



