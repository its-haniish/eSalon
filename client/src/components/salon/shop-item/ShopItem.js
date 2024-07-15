import React,{useEffect, useRef, useState} from 'react';
import './shop-item.scss';

const ShopItem = ({ shop, handleShopItemClick }) => {
  const [shopLogo, setShopLogo] = useState(false);

  const getShopLogo = async () => {
    let response = await fetch('https://esalon-server.onrender.com/getLogo', {
      method : 'POST',
      body : JSON.stringify({email : shop.email}),
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
  useEffect(()=>{
    getShopLogo();
  },[])
  return (
    <div className="shop-item">
       <img src={shopLogo ? shopLogo : process.env.PUBLIC_URL + '/favicon.ico'} 
        alt="shopimage" />
      <div>
        <h3>{shop.shopName}</h3>
        <p>{shop.address}</p>
        <button onClick={handleShopItemClick}>Check Availability and Services</button>
      </div>
    </div>
  );
};

export default ShopItem;
