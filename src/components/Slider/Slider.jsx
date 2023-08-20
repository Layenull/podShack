import React from 'react';
import "./slider.scss";
import one from "../../props/Icons/Buy.svg";
import two from "../../props/Icons/Drone-delivery.svg";
import three from "../../props/Icons/Refer.svg";

 function Slider() {
    // const navigate = useNavigate();
    return (
      <div className='Slider'>
        <div className="img-slider">
        <div className="slider-container">
          
          <div className="slidez">
           <div className='slideImage'>
           <img src={one} alt=''/>
           </div>
            <p>Get items at very affordable prices</p>
          </div>
          
          <div className="slidez">
          <div className='slideImage'>
           <img src={two} alt=''/>
           </div>
          <p>Enjoy Fast and Secure Delivery</p>
          </div>
      
          <div className="slidez">
          <div className='slideImage'>
           <img src={three} alt=''/>
           </div>
          <p>Refer Friends and Earn</p>
          </div>
          
        </div>
      </div>
      </div>
    )

}
export default Slider
