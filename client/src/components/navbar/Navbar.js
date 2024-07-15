import React from 'react';
import "./navbar.scss"

const Navbar = ({ setPage }) => {
  const handleLogout = () => {
    localStorage.removeItem('eSalon-User')
    setPage('Login');
  }


  return (<>
    <nav>
      <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt="logo" />
      <ul className='links'>
        <li onClick={() => setPage('Salon')} >Salons</li>
        <li onClick={() => setPage('Profile')}>Profile</li>
        <li onClick={handleLogout}>Logout</li>
        <li onClick={() => setPage('Contact')}>Contact</li>
      </ul>

      <ul className="social">
        <li><a href="https://instagram.com/its.hanish_" target="_blank"><i className="fa-brands fa-instagram"></i></a></li>
        <li><a href="https://wa.me/919671323707" target="_blank"><i className="fa-brands fa-whatsapp"></i></a></li>
        <li><a href="https://github.com/toxiic-me" target="_blank"><i className="fa-brands fa-github"></i></a></li>
      </ul>

    </nav>
  </>)
}


export default Navbar;