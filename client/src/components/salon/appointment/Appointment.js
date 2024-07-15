import React, { useState, useRef, useEffect } from 'react';
import './appointment.scss';

const Appointment = ({ data, togglePopup }) => {
  const { shopName, startTime, duration, date, totalPrice, status } = data;
  const [shopData, setShopData] = useState([]);
  const [shopLogo, setShopLogo] = useState(false);
  const shopEmailRef = useRef(null);

  // Function to format time to 12-hour format
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60) + 8;
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${mins < 10 ? '0' : ''}${mins} ${period}`;
  }

  const fetchShopData = async (shop) => {
    try {
      let response = await fetch('https://esalon-server.onrender.com/getShop', {
        method: 'POST',
        body: JSON.stringify({ shopName: shop }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let result = await response.json();
      return result;
    } catch (error) {
      console.log('Error getting shop data:', error);
      return null;
    }
  };

  const handleDirectionToShop = async () => {
    const result = await fetchShopData(shopName);

    if (result) {
      const { latitude, longitude } = result;
      if (latitude && longitude) {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        window.open(mapsUrl);
      }
    }
  };

  const handleViewShop = async () => {
    const result = await fetchShopData(shopName);
    if (result) {
      setShopData(result);
      togglePopup(result);
    }
  };
  const getShopLogo = async () => {
    let responseFromDB =  await fetchShopData(shopName);
    shopEmailRef.current = responseFromDB.email;
    let response = await fetch('https://esalon-server.onrender.com/getLogo', {
      method : 'POST',
      body : JSON.stringify({email : shopEmailRef.current}),
      headers : {
        'Content-type' : 'application/json'
      }
    })
    let result = await response.json();
    if(result.logo){
      setShopLogo(result.logo);      
    }else{
      setShopLogo(false);
    }
  } 

  useEffect(() => {
    getShopLogo();
  }, []);

  return (
    <div className="appointment">
      <div className="img-box">
        <img src={shopLogo ? shopLogo: process.env.PUBLIC_URL + '/favicon.ico'} alt="shopimage" />
        <h3>{shopName}</h3>
      </div>
      <div>
        <div className="appointment-1">
          {status === 'PENDING' && <p id='PENDING'>{status}</p>}
          {status === 'APPROVED' && <p id='APPROVED'>{status}</p>}
          {status === 'REJECTED' && <p id='REJECTED'>{status}</p>}
          <p>PRICE: ₹{totalPrice}/-</p>
          <button onClick={handleViewShop} className="shop-map">
            View Shop
          </button>
        </div>
        <div className="appointment-2">
          <p>{date}</p>
          <p>
            {formatTime(startTime)}-{formatTime(startTime + duration)}
          </p>
          <button onClick={handleDirectionToShop} className="shop-map">
            Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
