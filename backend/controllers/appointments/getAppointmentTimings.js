const Appointments = require("../../models/Appointments");

const getAppointmentTimings = async (req, res) => {
    try {
        console.log("Checking previous data and creating time slots for avaliable time.");
        const request = req.body; // Assuming you have incoming data like { time, date, shopName, duration }
        const timeslots =[]

        // Replace this with actual data retrieval from the database
        const appointments = await Appointments.find({shopName: request.shopName,date: request.date})

        if (appointments.length > 0) {
            // Create an array to represent time slots (assuming 720 minutes in a day)
            let arr = new Array(720).fill(true);

            // Mark slots as false based on existing appointments
            appointments.forEach(elem => {
                let endTime = elem.startTime + elem.duration; 
                for (let i = elem.startTime; i < endTime; i++) {
                    arr[i] = false;                
                }
            });

            let newArr = []
            arr.forEach((elem,index) => {
                if(elem == true){
                    if(newArr.length == request.duration){
                        timeslots.push({startTime: newArr[0],endTime: newArr[newArr.length-1]+1,duration: newArr[newArr.length-1]+1- newArr[0]})
                        newArr = []
                    }else{
                        newArr.push(index)
                    }
                }else{
                    newArr = []
                }
            })
            
            res.send(timeslots);
        } else {
            // Handle the case where there are no appointments
            let arr = new Array(720).fill(true);
            let newArr = []
            arr.forEach((elem,index) => {
                if(elem == true){
                    if(newArr.length == request.duration){
                        timeslots.push({startTime: newArr[0],endTime: newArr[newArr.length-1]+1,duration: newArr[newArr.length-1]+1- newArr[0]})
                        newArr = []
                    }else{
                        newArr.push(index)
                    }
                }else{
                    newArr = []
                }
            })

            console.log("Timeslots created successfully and sent to the user.");
            res.send(timeslots);

        }
    } catch (error) {
        console.error("Error in getAppointmentTimings:", error);
        res.status(500).send(false); 
        }
}

module.exports = getAppointmentTimings;
