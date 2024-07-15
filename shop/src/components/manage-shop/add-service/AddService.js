import React,{useState} from 'react'
import './add-service.scss'

const AddService = ({toggleAddServiceView,data,setInputData}) => {
    const [inputDataField,setInputDataField] = useState({})
    const handleFieldChange = (e) => setInputDataField({...inputDataField,[e.target.name]:e.target.value})
    const handleAddServiceClick = e =>{
        e.preventDefault()
        data.services = [...data.services,inputDataField]
        setInputData({...data})
        toggleAddServiceView(e)
    }
  return (<div className='add-service-box'>
    <button id='close-add-service'
    onClick={(e)=>toggleAddServiceView(e)}
    ><i class="fa-solid fa-xmark"></i></button>
    <form 
    className='add-service-form'
    onSubmit={handleAddServiceClick}>
        <fieldset>
            <legend>Service</legend>
            <input 
            type="text" 
            name="service" 
            id="service"
            onChange={handleFieldChange}
            required />
        </fieldset>
        <fieldset>
            <legend>Price</legend>
            ₹<input 
            type="number" 
            name="price" 
            id="price"
            onChange={handleFieldChange} 
            required/>/-
        </fieldset><fieldset>
            <legend>Time</legend>
            <input 
            type="number" 
            name="time" 
            id="time"
            onChange={handleFieldChange} 
            required/>mins
        </fieldset>
        <input 
        type="submit" 
        value="Add Service" 
        />
    </form>
  </div>)
}

export default AddService