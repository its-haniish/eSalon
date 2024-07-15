import React, { useEffect, useState } from 'react'

const UserName = ({email}) => {
    const [name,setName] = useState(false)
    
    useEffect(()=>{
        const getUserName = async (userEmail)=>{
            let response = await fetch('https://esalon-server-s7zp.onrender.com/getUserInfo', {
                method: 'POST',
                body: JSON.stringify({ email: userEmail}),
                headers: { 'Content-Type': 'application/json' }
            });
            let result = await response.json();
            result?.userName ?  setName(result?.userName) :setName(false)
        }
        getUserName(email);
    },[])
  return (
    <p id='user-name'>Name: <span>{name ||  'Not Mentioned'}</span></p>
  )
}

export default UserName