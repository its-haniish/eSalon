// import functions and models
const getDistance = require('../functions/getDistance.js');
const Shops = require('../../models/Shops.js');

// api to get near by shops
const nearByShops = async (req, res) => {
  try {
    console.log(`Getting shops in range of ${req.body.distance}km to Latitude: ${req.body.latitude} and Longitude: ${req.body.longitude }.`);
    const lat1 = req.body.latitude;  
    const lon1 = req.body.longitude;
    const allShops = await Shops.find({});
    if (allShops) {
      let nearShops = [];
      allShops.forEach(shop => {
        const lat2 = shop.latitude;
        const lon2 = shop.longitude;
        const distance = getDistance(lat1, lon1, lat2, lon2);
        if(distance <= req.body.distance){nearShops.push(shop)}
      });
      console.log(`Found ${nearShops.length} near shops`);
      res.send(nearShops);
    } else {
      res.send(true);
    }
  } catch (error) {
    console.error(error);
    res.send(false);
  }
};

module.exports = nearByShops;
