import React from 'react';
import './banner.scss';
import watch from '../../props/Images/slide-1.png';
import iPod from '../../props/Images/ipodWhite.png';
import iPod2 from '../../props/Images/slide-1.webp';
import pad from '../../props/Images/pad.jpg';
import camera from '../../props/Images/slide-2.webp';
import clothes from '../../props/Images/slide-3.webp';

export function Banner() {
    return (
        <div className='Banner ' style={{backgroundImage : `url(${pad})`}}>
              <div className='overlay'></div>
            <div className='Banner__Left'>
                <div className='Banner__Left__text'>
                <div className='mobileHeadDiv '><h1>Purchasing food has never been easier.</h1> </div>
                <p>buy food online <strong></strong> </p>
                {/* <p> What more could you ask for?</p> */}
                </div>
                {/* <button className='Banner__Left__btn'>Explore</button> */}
            </div>
            {/* <div className='Banner__Right'>
                <img src={watch} alt="watch" />
            </div> */}
        </div>
    );
}
 export function Banner2() {
    return (
        // <div cl>
        <div className='Banner' style={{backgroundImage : `url(${pad})`}}>
            <div className='overlay'></div>
            <div className='Banner__Left'>
                <div className='Banner__Left__text'>
                <div className=''><h1>Get food at affordable prices.</h1></div>
                {/* <p>Get everyday items at affordable prices, with super fast delivery.</p> */}
                 <p> What more could <strong>You</strong> ask for?</p>  
                </div>
                {/* <button className='Banner__Left__btn'>Explore</button>  */}
            </div>
             {/* <div className='Banner__Right'>
            //     <img src={iPod2} alt="watch" className='ipod-special' />
            // </div> */}
        </div>
        // </div>
    );
};

export function Banner3() {
    return (
        <div className='Banner' style={{backgroundImage : `url(${pad})`}}>
            <div className='overlay'></div>
            <div className='Banner__Left'>
                <div className='Banner__Left__text'>
                <div className='mobileHeadDiv'><h1>Free delivery on food on campus</h1></div>
                <p>This offer is currently supported within <strong>Trinity</strong> University.</p>
         {/* <p> What more could you ask for?</p>  */}
                </div>
                 
            </div>
          
            </div>
      
    );
}


export function ShopBanner() {
    return (
        // <div cl>
        <div className='Banner' style={{backgroundImage : `url(${clothes})`}}>
            <div className='overlay'></div>
            <div className='Banner__Left'>
                <div className='Banner__Left__text'>
                {/* <div className='mobileHeadDiv'><h1>Purchasing items has never been this easy.</h1></div>
                <p>Get everyday items at affordable prices, with super fast delivery.</p> */}
                {/* <p> What more could you ask for?</p> 
                </div>
                <button className='Banner__Left__btn'>Explore</button>  */}
            </div>
            {/* <div className='Banner__Right'>
            //     <img src={iPod2} alt="watch" className='ipod-special' />
            // </div> */}
        </div>
         </div>
    );
};
