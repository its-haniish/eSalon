// import Users model
const Shops = require('../../models/Shops.js');

// api to login
const loginShop = async (req, res) => {
    try {
        console.log(req.body);
        const response = await Shops.findOne({email:req.body.email});
        if(response){
        if(response.email == req.body.email && response.password == req.body.password){
            console.log(`${req.body.email} logged in successfully`);
            res.send(true);
        }else{
            console.log(`${req.body.email} login failed`);
            res.send(false);
        }
    }else{
        console.log("User not registered.");
    }
    }
    catch (err) {
        console.log(err);
        res.send(false);
    }
}

module.exports = loginShop;