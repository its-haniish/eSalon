import React from 'react'
import './navbar.scss'

const Navbar = ({ setPage }) => {
  return (<nav>
    <div className="nav-logo">
      <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt="app-icon" />
      <h2>eSalon</h2>
    </div>
    <ul className='links'>
      <li
        onClick={() => setPage('ManageShop')}
      >Manage Shop</li>
      <li
        onClick={() => setPage('Appointments')}
      >Appointments</li>
      <li
        onClick={() => setPage('Contact')}
      >Help?</li>
    </ul>
    <ul className='social'>
      <li><a href="https://instagram.com/its.hanish_" target="_blank"><i className="fa-brands fa-instagram"></i></a></li>
      <li><a href="https://wa.me/919671323707" target="_blank"><i className="fa-brands fa-whatsapp"></i></a></li>
      <li><a href="https://github.com/toxiic-me" target="_blank"><i className="fa-brands fa-github"></i></a></li>
    </ul>
  </nav>)
}

export default Navbar