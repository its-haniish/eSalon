// import UserImage model
const UserImage = require('../../models/UserImage.js');

const getImage = async (req, res) => {
    console.log("Image requested for " + req.body.email);
     let response = await UserImage.findOne({ email: req.body.email });
      if (response) {
          console.log("Image found");
          res.send(response);
      } else {
          console.log("Image not found");
          res.send(false);
      }
  };
  module.exports = getImage;

