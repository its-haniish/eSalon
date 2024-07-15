import React, { useEffect, useRef, useState } from 'react';
import './manage-shop.scss';
import Toast from '../toast/Toast';
import Navbar from '../navbar/Navbar';
import AddService from './add-service/AddService';

const ManageShop = ({ setPage }) => {
  const [message, setMessage] = useState(false);
  const [addServiceView, setAddServiceView] = useState(false);
  const [inputData, setInputData] = useState({});
  const [logoPreview,setLogoPreview] = useState('')
  const [selectedLogo,setSelectedLogo] = useState('')
  const selectedFile = useRef(null);
  const [file,setFile] = useState(null);
  const savedDataRef = useRef({});

  const handleLogout = () => {
    localStorage.removeItem('eSalon-Shop')
    setPage('Login');
  };

  const handleInputChange = (e) =>
    setInputData({ ...inputData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        selectedFile.current = reader.result;
        document.getElementById('shop-logo').src = selectedFile.current;
      };
    };
    
    const handleImageUpload = async () => {
      try {
        let response = await fetch('https://esalon-server-s7zp.onrender.com/addLogo',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            email: JSON.parse(localStorage.getItem("eSalon-Shop")).email,
            logo: selectedFile.current
          })
            })
        let result = await response.json();
        if(result){
          setMessage('Image uploaded successfully');
          setTimeout(() => {
            setMessage(false)
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        setMessage('Error uploading image');
        setTimeout(() => {
          setMessage(false)
        }, 2000);
      }

    };
  
    const handleFetchCoordinates = (e) => {
      e.preventDefault()
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            setInputData({...inputData,...coordinates})
            setMessage('✅Coordinates fetched successfully✅')
            setTimeout(() => {
              setMessage(false)
            }, 2000);
          },
          (error) => {
            console.error('Error getting current coordinates:', error.message);
            setMessage('❌Error fetching coordinates❌')
            setTimeout(() => {
              setMessage(false)
            }, 2000);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
        setMessage('❌Error fetching coordinates❌')
        setTimeout(() => {
          setMessage(false)
        }, 2000);
      }
    };
    

    const handleSubmit = async (e) => {
     e.preventDefault();
     file ? 
     handleImageUpload(): console.log('NO file selected');
      try {
        const response = await fetch('https://esalon-server-s7zp.onrender.com/updateShop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
        });

        const data = await response.json();

        if (data) {
          setMessage('Saved Successfully');
          setTimeout(() => 
          setMessage(false)
          , 3000);
        } else {
          setMessage('Something went wrong');
          setTimeout(() => setMessage(false), 3000);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const deleteService = async (e,service) => {
      e.preventDefault();
      setInputData({...inputData,services:inputData.services.filter((elem) => elem.service !== service)})
      savedDataRef.current.services = savedDataRef.current.services.filter((elem) => elem.service !== service);
      console.log('Deleting: ',service);
    }

    const toggleAddServiceView = (e) => {
      e.preventDefault();
      setAddServiceView(!addServiceView);
    }
  useEffect(() => {
    const getSavedData = () => {
      let savedDataResponse = fetch('https://esalon-server-s7zp.onrender.com/getShop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem('eSalon-Shop')).email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          savedDataRef.current = data;
          setInputData(data)
        })
        .catch((err) => console.log(err));
    };
    getSavedData();

    const showLogo = async () => {
      let response = await fetch('https://esalon-server-s7zp.onrender.com/getLogo',{
          method:'POST',
          body:JSON.stringify({
            email: JSON.parse(localStorage.getItem('eSalon-Shop')).email,
          }),
          headers:{'Content-Type':'application/json'}
       })
      let result = await response.json()
      result?.logo ? setLogoPreview(result?.logo) : setLogoPreview(false); 
  }
  showLogo();
}, []);

  return (
    <>
      {addServiceView && <AddService 
      toggleAddServiceView={toggleAddServiceView} 
      data={savedDataRef.current}
      setInputData={setInputData}/>}
      {message && <Toast message={message} />}
      <Navbar setPage={setPage} />
      <form className="setup-form">
        <h2 id="owner-name">Owner: {savedDataRef.current.ownerName}</h2>
        <h2 id="shop-name">{savedDataRef.current.shopName}</h2>
        <h2 id="email">Email: {savedDataRef.current.email}</h2>

        <div className="left">
          <div className="main-logo-box">
            <div className="shop-icon-box">
              <img
                className="shop-logo-input"
                id='shop-logo'
                src={logoPreview !== false && logoPreview !== '' && logoPreview !== null  ? logoPreview : process.env.PUBLIC_URL + '/favicon.ico'}
                alt="shop-logo"
              />
              <i class="fa-solid fa-pen-to-square"></i>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder="Phone Number"
            value={inputData.phone || ''}
            onChange={handleInputChange}
          />

          <textarea
            id="address"
            type="text"
            name="address"
            placeholder="Address description (visible to your customers)"
            onChange={handleInputChange}
            value={inputData.address || ''}
            draggable="false"
          />
          <button id="coordinates-btn"
            onClick={handleFetchCoordinates}>
            <i class="fa-solid fa-location-crosshairs"></i>
            Fetch Location
          </button>
        </div>

        <div className="right">
          <div className="service-box">
            <h2>Services</h2>
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Time</th>
                  <th>
                    <button
                    onClick={toggleAddServiceView}
                    >
                      <i class="fa-regular fa-square-plus"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  savedDataRef.current.services?.map((elem,index) => {
                    return(
                      <tr key={index}>
                        <td>{elem.service}</td>
                        <td>₹{elem.price}/-</td>
                        <td>{elem.time}mins</td>
                        <td>
                          <button
                            onClick={(e) => deleteService(e,elem.service)}
                            >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

        <input type="submit" value="Save" onClick={handleSubmit} />
      </form>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default ManageShop;
