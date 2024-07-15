// importing required models 
const Users = require('../../models/Users.js');

const update = async (req, res) => {
    try {
        console.log(`Updating ${req.body.email}...`);
        const response = await Users.updateOne({email:req.body.email},{...req.body});
        response ? console.log(`${req.body.email} updated successfully`) : console.log(`Error updating user.`)
        response ? res.send(true) : res.send(false);
    } catch (error) {
        console.log(error);
        res.send(false);
    }
};

module.exports = update;
