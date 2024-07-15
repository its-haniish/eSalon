// importing required functions and models
const Users = require('../../models/Users.js');

// api to add a new user
const signup = async (req, res) => {
    try {
        console.log(`Registrating ${req.body.email}...`);
        const savedUsers = await Users.find({email:req.body.email});
        if(savedUsers.length > 0){
            console.log(`${req.body.email} already exists`);
            res.send(false);
        }else{
            const response = await Users.create(req.body);
            response ? console.log(`${req.body.email} added successfully`) : console.log(`Error saving user.`)
            response ? res.send(true) : res.send(false)
        }

    }
    catch (err) {
        console.log(err);
        req.send(false);
    }
}

module.exports = signup;