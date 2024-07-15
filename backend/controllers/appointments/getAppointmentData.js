// importing required models
const Appointments = require("../../models/Appointments");

const getAppointmentData = async (req, res) => {
try {
    const request = req.body
    if(request.shopName === undefined || request.shopName === null || request.shopName === ""){
        console.log(`Fetching appointments for ${request.email}`);
        const appointments = await Appointments.find({userEmail: request.email})
        if(appointments){
            const reverseAppointments = appointments.reverse()
            res.send(reverseAppointments)
            console.log("Appointments fetched and sent.");
        }else{
            res.send([])
            console.log("No appointments found");
        }
    }else{
        console.log(`Fetching appointments for ${request.shopName}`);
        const appointments = await Appointments.find({shopName: request.shopName})
        if(appointments){
            const reverseAppointments = appointments.reverse()
            res.send(reverseAppointments)
            console.log("Appointments fetched and sent.");
        }else{
            res.send([])
            console.log("No appointments found");
        }
    }
   
} catch (error) {
    console.log("Error fetching appointments");
    res.send([])
}

}


module.exports = getAppointmentData;