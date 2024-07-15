// importing models
const Shops = require('../../models/Shops.js');
const Logos = require('../../models/Logos.js');

const deleteShop = async (req, res) => {
    try {
        console.log(`Deleting ${req.body.shopName}...`);
        const response = await Shops.deleteOne({ shopName: req.body.shopName });
        if(response){
            console.log('Shop deleted successfully from database.');
            const response = await Logos.deleteOne({ shopName: req.body.shopName });
            response ? console.log('Shop logo deleted successfully from database.') : console.log('Error deleting shop logo.');
            response ? res.send(true) : res.send(false);
        }else{
            console.log('Error deleting shop from database.');
            res.send(false);
        }
    } catch (error) {
        console.log(error);
        res.send(false);
    }

};

module.exports = deleteShop;
