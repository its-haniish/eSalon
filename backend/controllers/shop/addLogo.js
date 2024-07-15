// import model and package
const Logos = require('../../models/Logos');;

// function to add logo
const addLogo = async (req, res) => {
    try {
        let savedLogo = await Logos.findOne({ email: req.body.email });
        if (savedLogo) {
                    let response = await Logos.deleteMany({ email: req.body.email });
                    response ? console.log("Old logo deleted from the database") : console.log("Old logo not deleted from the database");
                    if (response) {
                        console.log("Saving new logo");
                        let newLogoResponse = await Logos.create({ logo: req.body.logo, email: req.body.email });
                        newLogoResponse ? console.log("New logo saved") : console.log("New logo not saved");
                        res.send(newLogoResponse ? true : false);
                    } else {
                        res.send(false);
                    }
                
        } else {
            console.log(`Logo adding for ${req.body.email}`);
            let response = await Logos.create({ logo: req.body.logo, email: req.body.email });
            response ? console.log("New logo saved") : console.log("New logo not saved");
            res.send(response ? true : false);
        }
    } catch (err) {
        console.log(err);
        res.send(false);
    }
}

module.exports = addLogo;