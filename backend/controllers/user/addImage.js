// import model and package
const UserImage = require('../../models/UserImage.js');

// function to add logo
const addImage = async (req, res) => {
    try {
        let savedLogo = await UserImage.findOne({ email: req.body.email });
        if (savedLogo) {
                    let response = await UserImage.deleteMany({ email: req.body.email });
                    response ? console.log("Old image deleted from the database") : console.log("Old image not deleted from the database");
                    if (response) {
                        console.log("Saving new image");
                        let imageRes = await UserImage.create({ image: req.body.image, email: req.body.email });
                        imageRes ? console.log("New image saved") : console.log("New image not saved");
                        res.send(imageRes ? true : false);
                    } else {
                        res.send(false);
                    }
                
        } else {
            console.log(`Logo adding for ${req.body.email}`);
            let response = await UserImage.create({ image: req.body.image, email: req.body.email });
            response ? console.log("New image saved") : console.log("New image not saved");
            res.send(response ? true : false);
        }
    } catch (err) {
        console.log(err);
        res.send(false);
    }
}

module.exports = addImage;