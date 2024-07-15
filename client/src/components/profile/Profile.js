import React, { useState, useLayoutEffect, useRef } from 'react';
import "./profile.scss";
import Toast from '../toast/Toast';
import Navbar from '../navbar/Navbar';

const Profile = ({ setPage }) => {
    const [data, setData] = useState(null);
    const [newData, setNewData] = useState({});
    const [message, setMessage] = useState(false);
    const [image,setImage] = useState(null);
    const selectedFile = useRef(null);
    const [file, setFile] = useState(null);
    const userInfo = useRef(JSON.parse(localStorage.getItem('eSalon-User')));

    const handleProfileChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };
    const handleImageUpload = async () => {
        if(selectedFile.current !== process.env.PUBLIC_URL + '/favicon.ico' && selectedFile.current !== null){
             await fetch('https://esalon-server.onrender.com/addImage', {
                method: 'POST',
                body: JSON.stringify({ email: JSON.parse(localStorage.getItem("eSalon-User")).email, image: selectedFile.current }),
                headers: { 'Content-Type': 'application/json' }
            });
        }
      };
    

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.current) {
            // Send a request to update the user's information on the server
            const response = await fetch('https://esalon-server.onrender.com/update', {
                method: 'POST',
                body: JSON.stringify({ email: userInfo.current.email, ...newData }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                // Update the local user data with the new data
                setData({ ...data, ...newData });

                if(file){
                    let response = handleImageUpload()
                    if(response){
                    setMessage('Profile updated successfully!');
                    setTimeout(() => {
                        setMessage(false);
                        setPage('Profile')
                    }, 1000); 
                    }else{
                        setMessage('Failed to update profile!');
                        setTimeout(() => {
                            setMessage(false);
                        }, 1000); 
                    }
                }else{
                    setMessage('Profile updated successfully!');
                    setTimeout(() => {
                        setMessage(false);
                        setPage('Profile')
                    }, 1000);
                }
                
            }
        }
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          selectedFile.current = reader.result;
          setImage(reader.result);
        };
    };

    const handleDeleteAccount = async()=>{
        const userPass = prompt("Enter your password to delete your account?");
        if(userInfo.current.password === userPass){
            const response = await fetch('https://esalon-server.onrender.com/delete', {
                method: 'POST',
                body: JSON.stringify({ email: userInfo.current.email }),
                headers: { 'Content-Type': 'application/json' }
            });            
            if (response.ok) {
                localStorage.clear();
                setMessage('Account deleted successfully!');
                setTimeout(() => {
                    setMessage(false);
                    setPage('Login')
                }, 1000); 
            }else{
                setMessage('Failed to delete account!');
                setTimeout(() => {
                    setMessage(false);
                }, 1000);
            }
    }}

    useLayoutEffect(() => {
        const showUserInfo = async () => {
            if (userInfo.current) {
                let response = await fetch('https://esalon-server.onrender.com/getUserInfo', {
                    method: 'POST',
                    body: JSON.stringify({ email: userInfo.current.email }),
                    headers: { 'Content-Type': 'application/json' }
                });
                let result = await response.json();
                setData({ ...result });
            }
        };
        showUserInfo();

        const showUserImage = async () => {
            let response = await fetch('https://esalon-server.onrender.com/getImage',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email:userInfo.current.email})
             })
            let result = await response.json();
            console.log('image: ',result);
            result ? setImage(result.image) : setImage(null)
        }

        showUserImage();

    }, [userInfo]);

    return (
        <>
            <Navbar setPage={setPage} />
            {message ? <Toast message={message} /> : null}
            <form className="profile" onSubmit={handleProfileSubmit}>
                <div className='img-input'>
                    <img id='image-preview-1' src={image !== null && image ? image : process.env.PUBLIC_URL + '/favicon.ico'} alt="user-img" />
                    <input onChange={handleImageChange} type="file" />
                    <div className="edit-img">
                        <i className="fa-solid fa-user-pen"></i>
                    </div>
                </div>
                <div className='input-text'>
                    <label htmlFor="userName">Name: </label>
                    <input
                        onChange={handleProfileChange}
                        value={newData.userName || (data ? data.userName : '')}
                        type="text"
                        name="userName"
                        placeholder="**Full Name**"
                        required
                    />
                </div>
                <div className='input-text'>
                    <label htmlFor="email">Email: </label>
                    <input
                        value={data ? data.email : ''}
                        type="text"
                        name="email"
                        placeholder="email@xyz.com"
                        readOnly
                    />
                </div>
                <div className='input-text'>
                    <label htmlFor="phone">Phone: </label>
                    <input
                        onChange={handleProfileChange}
                        value={newData.phone || (data ? data.phone : '')}
                        type="text"
                        name="phone"
                        placeholder="**Phone Number**"
                        />
                </div>
                <div className='input-btn'>
                    <input id='btn' type="submit" value="Save" />
                    <button onClick={handleDeleteAccount}  id='btn'>Delete</button>
                </div>
            </form>
        </>
    );
}
export default Profile;
