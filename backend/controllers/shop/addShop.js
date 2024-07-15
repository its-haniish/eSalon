// importing required models 
const Shops = require('../../models/Shops.js');

const addShop = async (req, res) => {
  try {
        console.log(`<----Registering new Shop---->`);
        const response = await Shops.findOne({shopName: req.body.shopName});
        if(response != null && response != undefined && response != '' ){
            console.log(`Shop already registered`);
            res.send(false);
        }else{
        const response = await Shops.create({...req.body})
        response ? console.log(`${req.body.shopName} registered successfully`) : console.log(`Error registering shop.`) 
        response ? res.send(true) : res.send(false)
      }
  }
  catch (err) {
    console.log(err);
    req.send(false);
  }
};

module.exports = addShop;
