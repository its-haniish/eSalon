import React,{useState,useEffect} from 'react'
import './app.scss'

import Signup from './components/signup/Signup'
import ManageShop from './components/manage-shop/ManageShop'
import Login from './components/login/Login'
import ForgetPass from './components/forget-pass/ForgetPass'
import Appointments from './components/appointments/Appointments'
import Contact from './components/contact/Contact'

const App = () => {
  const [page, setPage] = useState("Login");

  const openPage = (page) => {
    setPage(page);
  };

  return (<>
      {page === "Login" &&
      <Login
      setPage={openPage}
      />}
      {page === "Signup" &&
      <Signup
      setPage={openPage}
      />}
      {page === "ManageShop" &&
      <ManageShop
      setPage={openPage}
      />}
      {page === "Appointments" &&
      <Appointments
      setPage={openPage}
      />}
      {page === "Forget" &&
      <ForgetPass
      setPage={openPage}
      />}
      {page === "Contact" &&
      <Contact
      setPage={openPage}
      />}
      
  </>)
}

export default App
