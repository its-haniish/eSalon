// importing models 
const Shops = require('../../models/Shops.js');

const getShop = async(req,res)=> {
 try {
      console.log(`Data requested for ${req.body.email}`);
    let response = await Shops.findOne({email:req.body.email});
    if(response){
      res.send(response);
    }else{
    let response = await Shops.findOne({shopName:req.body.shopName});
    if(response){
      res.send(response);
    }else{
      res.send(false);
    }
    }
 } catch (error) {
    console.log(error);
    res.send(false); 
 }
}

module.exports = getShop;