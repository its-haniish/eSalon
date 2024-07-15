// importing required functions and models 
const Shops = require('../../models/Shops.js');

const updateShop = async (req, res) => {
    try {
        console.log(`Updating ${req.body.email}...`);
        const response = await Shops.updateOne({email:req.body.email},{...req.body});
        response ?
        console.log(`${req.body.email} updated successfully`) :
        console.log(`Error updating shop.`)
        response ? res.send(true) : res.send(false)
        
    } catch (error) {
        console.log(error);
        res.send(false);
    }
  
};

module.exports = updateShop;
