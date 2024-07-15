// TimeSlot component
import React, { memo, useEffect,useRef,useState } from 'react';
import './time-slot.scss';
import Toast from '../../../toast/Toast';

const TimeSlot = ({ data,shopName,togglePopup,setPage }) => {
    const [message, setMessage] = useState(false);
    const [totalTime, setTotalTime] = useState(data.reduce((a, b) => parseInt(a) + parseInt(b.time), 0));
    const [totalPrice, setTotalPrice] = useState(data.reduce((a, b) => parseInt(a) + parseInt(b.price), 0));
    const [totalServices, setTotalServices] = useState(data.length);
    // const timeSlots = useRef([]); 
    const [timeSlots, setTimeSlots] = useState([]);
    const userInfo = useRef(JSON.parse(localStorage.getItem('eSalon-User')));
    
    // function to get Appointment Timings from backend
    const getAppointmentTimings = async (totalTime) => {
        const response = await fetch('https://esalon-server.onrender.com/getAppointmentTimings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shopName: shopName,
                date: new Date().toLocaleDateString(),
                duration: totalTime,
                services: data,

            })
        });
        let dataRes = await response.json();
        setTimeSlots(dataRes);
    }

    // Function to format time to 12-hour format
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60) + 8;
        const mins = minutes % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${mins < 10 ? "0" : ""}${mins} ${period}`;
    }

    const handleBookBtn = async () => {
        // input[name='time-slot']:checked
        try {
            const selectedTimeSlot = document.querySelector('input[name="time-slot"]:checked').value;
            if (selectedTimeSlot !== '' && selectedTimeSlot !== undefined && selectedTimeSlot !== null){
                const [shopName, date, startTime, duration] = selectedTimeSlot.split(',');
                const response = await fetch('https://esalon-server.onrender.com/setAppointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        shopName: shopName,
                        date: date,
                        startTime: startTime,
                        duration: duration,
                        services: data,
                        totalPrice: totalPrice,
                        username: userInfo.current?.userName,
                        userEmail: userInfo.current?.email,
                        userPhone: userInfo.current?.phone,

                        status: 'PENDING'
                    }) // send data to backend           
                })
                let res = await response.json();
                if(res){
                    setMessage('Appointment Booked Successfully by at '+formatTime(startTime)+' on '+date+'!');
                    setTimeout(() => {
                        setMessage(false);
                        togglePopup()
                        setPage('Login')
                    }, 1500);
                }else{
                    setMessage('Appointment Booking Failed');
                    setTimeout(() => {
                        setMessage(false);
                    }, 1000);
                }
                
            }
            else {
                alert('Select a time slot');
            }    
            
        } catch (error) {
            console.log(error);
            
        }
     }

    useEffect(() => {
        setTotalTime((data.reduce((a, b) => parseInt(a) + parseInt(b.time), 0)));
        setTotalPrice(data.reduce((a, b) => parseInt(a) + parseInt(b.price), 0));
        setTotalServices(data.length);
        getAppointmentTimings(totalTime);
        

        const showUserInfo = async () => {
            if (userInfo.current) {
                let response = await fetch('https://esalon-server.onrender.com/getUserInfo', {
                    method: 'POST',
                    body: JSON.stringify({ email: JSON.parse(localStorage.getItem('eSalon-User')).email }),
                    headers: { 'Content-Type': 'application/json' }
                });
                let result = await response.json();
                userInfo.current = { ...result };
            }
        };
        showUserInfo();

    }, [totalTime, data]); 
    return (
        <>
        {message ? <Toast message={message} /> : null}
         { data.length !== 0 ?
            <div className='time-slot-box'>
                <h2>Available Time-Slots</h2>

                 
                <div className='total-view'>
                    <span>Total Services: {totalServices}</span>
                    <span>Total Price: ₹{totalPrice}/- </span>
                    <span>Total Time: {totalTime}mins</span>
                </div>
                <div className='view-time-slots'>
                    {
                        timeSlots.filter(timeSlot =>{
                            let dt = new Date();
                            let localTimeString = `${dt.toLocaleDateString()}, ${formatTime(timeSlot.startTime)}`;
                            let elemMilliseconds = new Date(localTimeString).getTime();
                            let currMilliseconds = dt.getTime();
                            return elemMilliseconds >= currMilliseconds;
                        })
                        .map((timeSlot,index)=>{
                            return (
                                <div className='time-slot' key={formatTime(timeSlot.startTime)}>
                                    <input type="radio" value={[shopName, new Date().toLocaleDateString() ,timeSlot.startTime ,totalTime]} name="time-slot" />
                                    <span>{formatTime(timeSlot.startTime)}-{formatTime(timeSlot.endTime)}</span>
                                </div>
                            )
                        })
                    }
                </div>
                    <button onClick={handleBookBtn} id='book-btn'>Book Appointment</button>
            </div>
            
            :<h3 className='no-service-selected'>Select services to see the available time slots for those services.</h3>}
        </>
    );
};

export default TimeSlot;