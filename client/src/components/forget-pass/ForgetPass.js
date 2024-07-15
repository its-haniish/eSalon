import React, { useState } from 'react'
import './forgetPass.scss'
import Toast from "../toast/Toast"

const ForgetPass = ({setPage}) => {
  const [message,setMessage] = useState(false)
  const [data,setData] = useState({})
  const [userEnteredOtp,setUserEnteredOtp] = useState({})
  const [otp,setOtp] = useState(Math.floor(Math.random()*1000000))
  const handleSendOtpFormChange = e => setData({...data,[e.target.name]:e.target.value}); 
  const handleSendOtpFormSubmit = async e => {
    e.preventDefault();
    let response = await fetch('https://esalon-server.onrender.com/sendOtp',{
      method:'POST',
      body: JSON.stringify({email:data.email,otp:otp}),
      headers: { "Content-Type": "application/json" }
    })
    let result = await response.json()
    if(result){
      setMessage('OTP sent successfully')
      setTimeout(() => {
        setMessage(false)
        document.querySelector('.forget-form-1').style.display = 'none'
        document.querySelector('.forget-form-2').style.display = 'flex'
      }, 1000);
    }else{
      setMessage('OTP not sent')
      setTimeout(() => {
        setMessage(false)
      }, 1000);
    }
  }
  const handleVerifyOtpFormChange = e => setUserEnteredOtp({...userEnteredOtp,[e.target.name]: e.target.value})

  const handleSendOtpFormVerify = async e =>{
    e.preventDefault();
    if(userEnteredOtp.otp === otp.otp){
      let response  = await fetch('https://esalon-server.onrender.com/update',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      })
      response = await response.json();
      if(response){
        setMessage('Password updated successfully')
        setTimeout(() => {
          setMessage(false)
          setPage('Login')
        }, 1000);
      }else{
        setMessage('Error updating password')
        setTimeout(() => {
          setMessage(false)
        }, 1000);
      }
    }else{
      setMessage('Wrong OTP');
      setTimeout(() => {
        setMessage(false)
      }, 1000);
    }
  }


  return (<>
  {message ? <Toast message={message} /> : null}
  <div className='forget-form-div'>
  <form onSubmit={handleSendOtpFormSubmit} className="forget-form-1">
    <h2>!! RECOVER PASSWORD !!</h2>
    <p>Don't have an account?<span onClick={()=>setPage('Signup')}> Signup</span></p>
    <input onChange={handleSendOtpFormChange}  name='email' type="email" placeholder='email@xyz.com' required/>
    <input onChange={handleSendOtpFormChange} name='password' type="password" placeholder='**New Password**' required />
    <input type="submit" id='send-forget-otp' value="Get OTP" />
  </form>
  <form onSubmit={handleSendOtpFormVerify} className="forget-form-2">
    <h2>!! Verify OTP !!</h2>
    <p>Don't have an account?<span onClick={()=>setPage('Signup')}> Signup</span></p>
    <input onChange={handleVerifyOtpFormChange} name='userOtp' type="text" placeholder='**Enter Your OTP**' required/>
    <input type="submit" id='verify-forget-otp' value="Verify OTP" />
  </form>
  </div>
  </>)
}

export default ForgetPass