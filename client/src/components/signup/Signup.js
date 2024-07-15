import React,{useState} from 'react'
import "./signup.scss";
import Toast from '../toast/Toast';

const Signup = ({setPage}) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState(false);
  const [otp,setOtp] = useState(Math.floor(Math.random() * 1000000));
  const [userOtp,setUserOtp] = useState(null)
  ;
  const handleChange = e => setData({...data, [e.target.name]: e.target.value});
  const handleOtpBox = e => setUserOtp(e.target.value);

  const handleSignupSubmit = async e => {
      e.preventDefault();
      let response = await fetch('https://esalon-server.onrender.com/sendOtp', {
          method: 'POST',
          body: JSON.stringify({email: data.email ,otp: otp}),
          headers: { 'Content-Type': 'application/json' }});
        const parsedResponse = await response.text();
        if(parsedResponse){
          document.getElementById('submit-signup').style.display = 'none';
          document.getElementById('signup-verify-form').style.display = 'flex'; 
          setMessage('OTP sent to your email');
          setTimeout(() => {
            setMessage(false)        
          }, 500);
        }else{
          setMessage('Something went wrong');
          setTimeout(() => {
            setMessage(false)         
          }, 1000);
        }
      }

  const handleVerifyOtp = async e => {
    e.preventDefault();
    if(userOtp == otp){
      let response = await fetch('https://esalon-server.onrender.com/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }})
      let parsedResponse = await response.text();
      // console.log(parsedResponse);
      if(parsedResponse == 'true'){
        setMessage('Account created successfully');
        setTimeout(() => {
          setMessage(false) 
          setPage('Login')        
        }, 1000);
      }else{
        setMessage('Account already exists');
        setTimeout(() => {
          setMessage(false)         
        }, 1000);
      }

      }

  }


  return (<>
  {message ? <Toast message={message} /> : null}
  <form onSubmit={handleSignupSubmit} className='signup-form'>
    <h2>!! SIGNUP !!</h2>
    <p>Already have an account?<span onClick={()=>setPage('Login')}> Login</span></p>
    <input onChange={handleChange} type="text" name='userName' placeholder='Full Name' required/>
    <input onChange={handleChange} type="email" name='email' placeholder='email@abc.com' required/>
    <input onChange={handleChange} type="password" name='password' placeholder='**Password**' required/>
    <input type="submit" value="Get OTP"  id='submit-signup'/>
  </form>
  <form onSubmit={handleVerifyOtp} className='signup-verify-form' id='signup-verify-form'>
      <input onChange={handleOtpBox} type="text" placeholder='**Enter OTP**' required/>
      <input type="submit" value="Verify" id="verify-otp" />
    </form>
  </>)
}

export default Signup