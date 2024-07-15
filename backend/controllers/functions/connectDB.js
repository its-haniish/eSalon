const mongoose = require('mongoose');
// connecting to eSalon database
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
    // function to connect to eSalon database
const connectDB = async () => {
    try {
        console.log("Connecting to eSalon...");   
        await mongoose.connect('mongodb+srv://allblogsdata:%40Hanish870807@cluster0.tdruxdp.mongodb.net/eSalon?retryWrites=true&w=majority', mongoOptions).then(() => {console.log("Connected to eSalon.")}
        ).catch(err => {
            console.log("Connection to eSalon Failed.")
            console.log("Retrying connection to eSalon in 5 seconds")
            setTimeout(() => {
            connectDB(); 
            }, 5000);
        })
    } catch (error) {
        console.log("Error trying to connect to eSalon")
        console.log("Retrying connection to eSalon in 10 seconds")
        setTimeout(() => {
            connectDB(); 
            }, 10000);
    }    
}

module.exports = connectDB;
