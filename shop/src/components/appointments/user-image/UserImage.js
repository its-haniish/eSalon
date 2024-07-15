import React, { useEffect, useState } from 'react'

const UserImage = ({userEmail}) => {
    const [imagePreview, setImagePreview] = useState(false);

    useEffect(()=>{
        const getUserImage = async (email)=>{
            let response = await fetch('https://esalon-server-s7zp.onrender.com/getImage',{
                method:'POST',
                body:JSON.stringify({email:email}),
                headers:{'Content-Type':'application/json'}
             })
            let result = await response.json();
            result?.image ? setImagePreview(result.image) : setImagePreview('');
        }
        getUserImage(userEmail)
},[])
  return (
    <img src={imagePreview ? imagePreview : process.env.PUBLIC_URL + '/favicon.ico'} alt="user-profile" />
  )
}

export default UserImage