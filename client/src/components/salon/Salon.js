import React, { useEffect, useState, useCallback, useRef } from 'react';
import './salon.scss';
import Navbar from '../navbar/Navbar';
import ShopItem from './shop-item/ShopItem.js';
import ShopPopup from './shop-popup/ShopPopup.js';
import Toast from '../toast/Toast.js';
import Appointment from './appointment/Appointment.js'

const Salon = ({ setPage }) => {
  const [shops, setShops] = useState([]); 
  const [appointments,setAppointments] = useState([]);
  const appointmentRef = useRef([]);

  const [popup, setPopup] = useState(false); 
  const [message, setMessage] = useState(false);
  const shopData = useRef(null);


  const userCoordinates = useRef({
    latitude: 0,
    longitude: 0
  });

  const togglePopup = (data)=>{
    setPopup(!popup);
    if(data){
      shopData.current = data;
    }
  }
  
  
  const handleServiceBtn = (shop) => {
    togglePopup(shop);
  };

  

  useEffect(() => {
    const getShops = async (coordinates) => {
      try {
        let response = await fetch('https://esalon-server.onrender.com/nearByShops', {
          method: 'POST',
          body: JSON.stringify({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            distance: 10,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        });
        let result = await response.json();
        setShops([...result]);
        if (result.length === 0) { // Check result length
          setMessage('No shops found');
          setTimeout(() => {
            setMessage(false);
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        setMessage('Error fetching shops');
        setTimeout(() => {
          setMessage(false);
        }, 1000);
      }
    };

    const getUserCoordinates = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position),
              (error) => reject(error)
            );
          });

          const { latitude, longitude } = position.coords;
          userCoordinates.current = { latitude, longitude };
          getShops(userCoordinates.current);
        } else {
          console.error('Geolocation is not supported in this browser.');
          // Set default coordinates for Hisar, India as a fallback
          userCoordinates.current = { latitude: 29.168807, longitude: 75.746661 };
          getShops(userCoordinates.current);
        }
      } catch (error) {
        console.error('Error getting user coordinates:', error);
        // Set default coordinates for Hisar, India as a fallback
        userCoordinates.current = { latitude: 29.168807, longitude: 75.746661 };
        getShops(userCoordinates.current);
      }
    };
    getUserCoordinates();

    const getAppointments = async () => {
    try {

      let email = JSON.parse(localStorage.getItem("eSalon-User"));
      let response = await fetch("https://esalon-server.onrender.com/getAppointmentData", {
        method: "POST",
        body: JSON.stringify({email: email.email}),
        headers: {
          "Content-type": "application/json"
        }
      })
      let result = await response.json();
      setAppointments(result);
      appointmentRef.current = result;
    } catch (error) {
      console.log("Error fetching appointments");
    }
    
    }
    getAppointments();

  }, []);

  return (
    <>
      {popup ? <ShopPopup data={shopData?.current} togglePopup={togglePopup} setPage={setPage} /> : null}
      {message ? <Toast message={message} setMessage={setMessage} /> : null}
      <Navbar setPage={setPage} />
      <div className="salon">
        <div className="shop-box">
          <h2>Nearby Salons - 10km</h2>
          {shops.length !== 0 ? (
            shops.map(elem => {
              const handleShopItemClick = () => {
                handleServiceBtn(elem);
                
              };

              return (
                <ShopItem
                  key={elem._id}
                  shop={elem}
                  handleShopItemClick={handleShopItemClick} // Pass the function
                />
              );
            })
          ) : null}
        </div>
        <div className="appointment-box">
          <h2>Appointments</h2>
            <div className='appointments'>
              {
                appointmentRef.current.length !== 0 ? (
                  appointmentRef.current.map((elem,index) => {
                    return (
                      <Appointment
                       key={index}
                       data={elem}
                       togglePopup={togglePopup}
                       />
                    )
                  })
                ) : <p>Your appointment history can be seen here.</p>
              }
            </div>
        </div>
      </div>

    </>
  );
};

export default Salon;
