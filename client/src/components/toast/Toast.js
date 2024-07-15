import React, { memo } from 'react';
import "./toast.scss"

const Toast = memo(({message}) => {
  return (<>
    <div className='toast' id='toast'>
    <p>{message}</p>    
    </div>
  </>)
})

export default Toast