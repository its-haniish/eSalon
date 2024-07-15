// import Users model
const Users = require('../../models/Users.js');

// api to login
const login = async (req, res) => {
    try {
        console.log(`Login requested for ${req.body.email}`);
        const savedUsers = await Users.findOne({email:req.body.email});
        if(savedUsers.email == req.body.email && savedUsers.password == req.body.password){
            console.log(`${req.body.email} logged in successfully`);
            res.send(true);
        }else{
            console.log(`${req.body.email} login failed`);
            res.send(false);
        }
    }
    catch (err) {
        console.log(err);
        res.send(false);
    }
}

module.exports = login;