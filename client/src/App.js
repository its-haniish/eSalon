import React, { useState } from "react";
import "./app.scss";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import ForgetPass from "./components/forget-pass/ForgetPass";
import Profile from "./components/profile/Profile";
import Salon from "./components/salon/Salon";
import Contact from "./components/contact/Contact";

const App = () => {
  const [page, setPage] = useState("Login");

  const openPage = (page) => {
    setPage(page);
  };


  return (<>
    {page === 'Salon' ? <Salon setPage={openPage} /> : null}
    {page === 'Profile' ? <Profile setPage={openPage} /> : null }
    {page === 'Signup' ? <Signup setPage={openPage} /> : null }
    {page === 'Login' ? <Login setPage={openPage} /> : null }
    {page === 'Forget_Pass' ? <ForgetPass setPage={openPage} /> : null }
    {page === 'Contact' ? <Contact setPage={openPage} /> : null }
  </>);
};

export default App;

