import React, { useState, useEffect} from 'react'
import './login.scss'
import Toast from '../toast/Toast';

const Login = ({setPage}) => {
  const [data,setData] = useState({});
  const [message,setMessage] = useState(false);

  const handleLoginChange = e => setData({...data, [e.target.name]: e.target.value});

  const handleLoginSubmit = async e => {
    e.preventDefault();
    let response = await fetch('https://esalon-server.onrender.com/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    let result = await response.json();
    if(result){
      setMessage('Logged in Successfully')
      localStorage.setItem('eSalon-User',JSON.stringify(data))
      setTimeout(() => {
        setMessage(false)
        setPage('Salon')
      }, 1000);
    }else{
      setMessage('Invalid Credentials')
      setTimeout(() => {
        setMessage(false)
      }, 1000);
    }
  }

  useEffect(() => {
    // function to auto login
    const autoLogin = async () => {
      if(localStorage.getItem('eSalon-User') != null){ 
        let response = await fetch('https://esalon-server.onrender.com/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: localStorage.getItem('eSalon-User')
        });
        let result = await response.json();
        result ? setPage('Salon') : setPage('Login');
      }
    }
    autoLogin();
  },[])

  return (<>
  {message ? <Toast message={message} /> : null}
  <form onSubmit={handleLoginSubmit} className='login-form'>
    <h2>!! LOGIN !!</h2>
    <p>Don't have an account?<span onClick={()=>setPage('Signup')}> Signup</span></p>
    <input onChange={handleLoginChange} type="email" name='email' placeholder='email@abc.com' required/>
    <input onChange={handleLoginChange} type="password" name='password' placeholder='**Password**' required/>
    <p>Forget your password?<span onClick={()=>setPage('Forget_Pass')}> Recover</span></p>
    <input type="submit" value="Login"  id='submit'/>
  </form>
  </>)
}

export default Login