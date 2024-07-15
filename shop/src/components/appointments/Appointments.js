import React, { useEffect, useRef, useState } from 'react'
import './appointments.scss'
import Navbar from '../navbar/Navbar'
import UserImage from './user-image/UserImage'
import UserName from './user-name/UserName'
import Toast from '../toast/Toast'

const Appointments = ({setPage}) => {
      const [appointments, setAppointments] = useState([])
      const [message, setMessage] = useState(false)
      const [totalEarnings, setTotalEarnings] = useState(0)
      const shopDataRef = useRef({})
      // Function to format time to 12-hour format
      function formatTime(minutes) {
        const hours = Math.floor(minutes / 60) + 8;
        const mins = minutes % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${mins < 10 ? "0" : ""}${mins} ${period}`;
      }
      
      const handleApprove = async(appointment) => {
        let response  = await fetch('https://esalon-server.onrender.com/updateAppointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appointmentId: appointment._id,
            status: 'APPROVED'
          })
        })
        let result = await response.json()
        if(result){
        appointment.status = 'APPROVED'
        setAppointments([...appointments])
        setTotalEarnings(totalEarnings+appointment.totalPrice)
        setMessage('✅Appointment Approved✅')
        setTimeout(()=>{setMessage(false)},2000)
      }else{
        setMessage('❌Something went wrong❌')
        setTimeout(()=>{setMessage(false)},2000)
      }
      }

      const handleReject = async(appointment) => {
        let response  = await fetch('https://esalon-server.onrender.com/updateAppointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appointmentId: appointment._id,
            status: 'REJECTED'
          })
        })
        let result = await response.json()
        if(result){
        appointment.status = 'REJECTED'
        setAppointments([...appointments])
        setMessage('✅Appointment Rejected✅')
        setTimeout(()=>{setMessage(false)},2000)
      }else{
        setMessage('❌Something went wrong❌')
        setTimeout(()=>{setMessage(false)},2000)
      }
      }

      useEffect(()=>{
        const getAppointments =async (shopName) => {
          let response = await fetch('https://esalon-server.onrender.com/getAppointmentData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              shopName: shopName,
            }),
          })
          let result = await response.json()
          result ? setAppointments([...appointments,...result]) : setAppointments([...appointments])
          if(result.length > 0){
            let total = 0
            result.forEach((appointment)=>{
              if(appointment.status === 'APPROVED'){
                total += appointment.totalPrice
              }
            })
            setTotalEarnings(total)
          }
        }
        const getShopData = () => {
          let getShopData = fetch('https://esalon-server.onrender.com/getShop', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: JSON.parse(localStorage.getItem('eSalon-Shop')).email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              shopDataRef.current = data;
              if(shopDataRef?.current !== null && shopDataRef?.current !== undefined){
                getAppointments(shopDataRef.current.shopName)
              }else{
                console.log('shopDataRef.current is null');
              }
            })
            .catch((err) => console.log(err));
        };
        getShopData(); 

      },[])
  return (<>
    {message ? <Toast message={message} setMessage={setMessage}/> : null}
    <Navbar setPage={setPage}/>
    <div className='appointments-main'>
      <h2>!! Appointments !!</h2>
      <p id='totalEarned'>Total Earnings: <span>₹{totalEarnings}/-</span></p>
      <p id='totalAppointments'>Total Appointments: <span>{appointments.length}</span></p>

      <div className="appointment-box">
        {
          appointments.map((appointment,index) =>{

            return(
              <div className="appointment" key={index}>
              <UserImage userEmail={appointment.userEmail}/>
              <div className='customer-details'>
              <UserName email={appointment.userEmail}/>
              <p id='user-name'>Email: <span>{appointment?.userEmail || 'Not Mentioned'}</span></p>
              <p id='user-name'>Phone: <span>{appointment?.userPhone || 'Not Mentioned'}</span></p>
              </div>
                <table className='service-details'>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      appointment.services.map((service,index)=>{
                        return(
                          <tr key={index}>
                          <td>{service.service}</td>
                          <td>₹{service.price}/-</td>
                          <td>{service.time}mins</td>
                        </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              <div className="appointment-details">
                <p id='appointment-date'>Date: <span>{appointment.date}</span></p>
                <p id='appointment-time'>{formatTime(appointment.startTime)}-{formatTime(appointment.startTime+appointment.duration)}</p>
                <p id='appointment-status'>Total Price: <span>₹{appointment.totalPrice}/-</span></p>
              </div>
              <div className="appointment-actions">
                {
                appointment.status === 'PENDING' ?
                <>
                <p id='PENDING'>PENDING</p> 
                <button id='accept' onClick={()=>handleApprove(appointment)}>Approve</button>
                <button id='reject' onClick={()=>handleReject(appointment)}>Reject</button>
                </>: null
                }
                {
                appointment.status === 'APPROVED' ?
                <p id='APPROVED' className='status-class'>APPROVED</p> :
                null
                }
                {
                appointment.status === 'REJECTED' ?
                <p id='REJECTED' className='status-class'>REJECTED</p> :
                null
                }

              </div>
            </div>
            )
          })
        }
      </div>
    </div>
    </>)
}

export default Appointments