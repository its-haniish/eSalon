// // importing the Appointment model
const Appointments = require("../../models/Appointments");

const updateAppointment = async (req,res)=>{
    try{
        const {appointmentId,status} = req.body;
        let response = await Appointments.updateOne({_id:appointmentId},{status:status})
        if(response.modifiedCount !== 1){
            res.send(false)
        }else{
            res.send(true)
        }
    }catch(err){
        console.log(err);
        res.send(false)
    }
}

module.exports = updateAppointment;