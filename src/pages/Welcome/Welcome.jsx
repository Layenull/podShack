import React, { useState, useEffect } from 'react';
import Slider from '../../components/Slider/Slider';
import logo from '../../props/Images/logoDark-small.svg';
import './welcome.scss';
import { useNavigate } from 'react-router';
import Splash from '../../components/Splash/Splash';
function Welcome() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for 3 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div>
            {
                isLoading ?
                    <Splash /> :

                    <div className='Welcome'>
                        <div className='Welcome__top'>
                            <img src={logo} alt="" />
                        </div>
                        <div className='Welcome__slider'>
                            <Slider />
                        </div>
                        <div className='Btn-container'>
                        <div className='Welcome__Btn register' onClick={() => {
                            navigate('/register')
                        }}>Sign Up</div>
                        <div className='Welcome__Btn' onClick={() => {
                            navigate('/home')
                        }}>Explore</div>
                        </div>
                      
                    </div>
            }
        </div>
    );
}

export default Welcome;