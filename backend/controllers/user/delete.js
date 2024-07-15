const Users = require('../../models/Users.js');
const UserImage = require('../../models/UserImage.js');
const path = require('path');
const fs = require('fs').promises; // Import the 'promises' version of fs for async/await support

const deleteUser = async (req, res) => {
    try {
        const email = req.body.email;

        console.log(`Deleting user with email: ${email}...`);

        // Delete the user from the database
        const userDeletionResponse = await Users.deleteOne({ email });
        if (userDeletionResponse.deletedCount === 1) {
            console.log(`User ${email} deleted successfully from the database.`);

            // Find the user image
            const userImage = await UserImage.findOne({ email });

            if (userImage && userImage.image) {
                // Delete the user image from the server
                const imageFilePath = path.join('./images/user-images/', userImage.image);

                await fs.unlink(imageFilePath); // Use await for file deletion

                console.log(`User image ${userImage.image} deleted from the server.`);

                // Delete the user image from the database
                const imageDeletionResponse = await UserImage.deleteOne({ email });

                if (imageDeletionResponse.deletedCount === 1) {
                    console.log(`User image deleted successfully from the database.`);
                    res.send(true);
                } else {
                    console.log(`Error deleting user image from the database.`);
                    res.send(false);
                }
            } else {
                console.log(`User image not found in the database.`);
                res.send(false);
            }
        } else {
            console.log(`Error deleting user ${email} from the database.`);
            res.send(false);
        }
    } catch (error) {
        console.error(error);
        res.send(false);
    }
};

module.exports = deleteUser;
