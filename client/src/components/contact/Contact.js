import React,{useState,useRef,useEffect} from 'react'
import './contact.scss'
import Toast from '../toast/Toast'
import Navbar from '../navbar/Navbar'

const Contact = ({setPage}) => {
    const [message, setMessage] = useState(false)
    const [data,setData] = useState({})
    const handleSendMessage = (e) => {
        e.preventDefault()
        setMessage('✅Message Sent Successfully✅')
        setTimeout(() => {
            setMessage(false)
            document.getElementById('message').value = ''   
        }, 2000);
    }

    useEffect(() => {
        const showUserInfo = async () => {
                let response = await fetch('https://esalon-server.onrender.com/getUserInfo', {
                    method: 'POST',
                    body: JSON.stringify({ email: JSON.parse(localStorage.getItem('eSalon-User')).email }),
                    headers: { 'Content-Type': 'application/json' }
                });
                let result = await response.json();
                setData({...result });
                console.log('data: ',data);
        };
        showUserInfo();
    }, [])
  return (<>
        {message ? <Toast message={message} /> : null}
        <Navbar setPage={setPage} />
        <form className="contact-form" onSubmit={handleSendMessage}>
            <h1>!! Contact Form !!</h1>
            <div className='division-1'>
            <div>
            <input 
            type="text" 
            name='shopName' 
            value={data?.userName || 'Error'} />
            <input 
            type="email" 
            name='email' 
            value={JSON.parse(localStorage.getItem('eSalon-User')).email} />
            <input 
            type="number" 
            name='phone' 
            value={data?.phone || 'Error'} />
            </div>
            <textarea 
            name="message" 
            id="message" 
            cols="30" 
            rows="10"
            placeholder='Enter your message here...'
            required></textarea>
            </div>
            <input type="submit" value='Send Message' />
        </form>

        </>)
}

export default Contact