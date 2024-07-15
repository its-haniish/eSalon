// import Users model
const Users = require('../../models/Users.js');

// api to getUserInfo
const getUserInfo = async (req, res) => {
    try {
        console.log(`${req.body.email} requesting data...`);
        const savedUsers = await Users.findOne({email:req.body.email});
        if(savedUsers.email == req.body.email){
            res.send(savedUsers);
            console.log(`Data sent for ${req.body.email}`);
        }else{
            console.log(`Failed to get data for ${req.body.email}`);
            res.send(false);
        }
    }
    catch (err) {
        console.log(err);
        res.send(false);
    }
}

module.exports = getUserInfo;