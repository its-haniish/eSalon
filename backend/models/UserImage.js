const mongoose = require('mongoose');

// schema and model for image
const userImage = new mongoose.Schema({
    email: String,
    image: String
})
const UserImage = new mongoose.model('userimage', userImage);

module.exports = UserImage;



