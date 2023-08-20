import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Banner2, Banner, Banner3 } from '../Banner/Banner';
import shoe from '../../props/Images/pad.jpg';
import shoes from '../../props/Images/shoes.jpg';
import headphones from '../../props/Images/01-slide-3.jpg'
import './bannerSlider.scss';


function BannerSlider() {
  return (
    // <div className='container'>
    <Carousel >
      <Carousel.Item interval={2500}>

        {/* <img
          className="d-block w-100"
          src={shoe}
          alt="First slide"
        /> */}
        <Banner/>
        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
      <Banner2/>
      {/* <img
          className="d-block w-100"
          src={shoe}
          alt="First slide"
        /> */}
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={2500}>
      <Banner3/>

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    // </div>
  );
}

// export default UncontrolledExample;
export default BannerSlider;