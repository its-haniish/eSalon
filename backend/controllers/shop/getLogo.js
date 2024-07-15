// import UserImage model
const Logos = require('../../models/Logos.js');

const getLogo = async (req, res) => {
    console.log("Logo requested for " + req.body.email);
     let response = await Logos.findOne({ email: req.body.email });
      if (response) {
          console.log("Logo found");
          res.send(response);
      } else {
          console.log("Logo not found");
          res.send(false);
      }
  };
  module.exports = getLogo;

