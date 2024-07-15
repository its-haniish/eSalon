
// ShopPopup component
import React, { useEffect, useRef, useState } from 'react';
import TimeSlot from './time-slot/TimeSlot';
import './shop-popup.scss';

const ShopPopup = ({ togglePopup, data ,setPage}) => {
    const [timeSlotView, setTimeSlotView] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const selectedRef = useRef([]);
    const [shopStatus, setShopStatus] = useState('OPEN');
    const [shopLogo, setShopLogo] = useState(false)

    const handleCheckbox = (e, elem) => {
        if (e.target.checked) {
            setSelectedServices((prevServices) => [...prevServices, elem]);
            selectedRef.current = [...selectedRef.current, elem];
            handleCheckTimeSlot();
        } else {
            setSelectedServices((prevServices) => prevServices.filter((service) => service !== elem));
            selectedRef.current = selectedRef.current.filter((service) => service !== elem);
            handleCheckTimeSlot();
        }
    };

    const handleCheckTimeSlot = () => {
        if (selectedRef.current.length > 0) {
            setTimeSlotView(true);
        }
    };

    const getShopLogo = async () => {
        let response = await fetch('https://esalon-server.onrender.com/getLogo', {
            method: 'POST',
            body: JSON.stringify({ email: data.email }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        let result = await response.json();
        if (result.logo) {
            setShopLogo(result.logo);
        } else {
            setShopLogo(false);
        }
    }

    useEffect(() => {
        getShopLogo()
        let currentTime = new Date().getTime();
        let shopOpenTime = new Date().setHours(8, 0, 0, 0);
        let shopCloseTime = new Date().setHours(20, 0, 0, 0);
        if (currentTime >= shopOpenTime && currentTime <= shopCloseTime) {
            setShopStatus('OPEN');
        } else {
            setShopStatus('CLOSED');
        }
    }, [])

    return (
        <>
            <div id='shop-info'>
                <button onClick={togglePopup} id='close-popup'><i className="fa-solid fa-xmark"></i></button>

                <div className='heading'>


                    <img src={shopLogo ? shopLogo : process.env.PUBLIC_URL + '/favicon.ico'}
                        alt="shopimage" />
                    <div>
                        <h2>{data?.shopName || 'Shop Name'} <span>Owner: {data?.ownerName || 'no owner name found'}</span> </h2>
                        <div>
                            <p>Email: {data?.email || 'no email found'}</p>
                            &nbsp;
                            <p>Phone: {data?.phone || 'no contact number found'}</p>
                        </div>
                    </div>
                    <div className='shop-status'>
                        <h3>STATUS: <span id={shopStatus}>{shopStatus}</span></h3>
                        <h3 style={{color:'orange'}}>8:00 AM-8:00 PM</h3>
                    </div>
                </div>
                <div className='service-time-box'>
                    <div className="service-list">
                        <table className='table'>

                            <tr>
                                <th>Service</th>
                                <th>Time</th>
                                <th>Price</th>
                            </tr>
                            {data?.services?.map((elem) => (
                                <tr key={elem._id}>
                                    <td>
                                        <input type='checkbox' value={elem._id} onChange={(e) => handleCheckbox(e, elem)} />
                                        {elem?.service}
                                    </td>
                                    <td>{elem?.time} mins</td>
                                    <td>₹{elem?.price}/-</td>
                                </tr>
                            ))}

                        </table>
                    </div>
                    <div className='time-slots'>
                        {timeSlotView ? <TimeSlot data={selectedRef.current} shopName={data.shopName} togglePopup={togglePopup} setPage={setPage}/> : <h3 className='no-service-selected'>Select services and click Check Time-Slots to see the available time slots for the selected services.</h3>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopPopup;
