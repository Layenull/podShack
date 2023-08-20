import React from 'react';
import logo from '../../props/Images/logoLight.svg';
import './splash.scss'
const Splash = () => {
  
  return(
      <div>
          {/* <meta http-equiv="refresh" content="4; URL='welcome'" /> */}
      <div className='Splash'>
          <div className='Splash_body'>
          <img src={logo} alt="" className='cartoon blink'/>
          </div>
      </div>
      </div>
  )
}
  
export default Splash;