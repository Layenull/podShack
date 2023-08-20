import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import FootBar from '../../components/FootBar/FootBar';
import NotificationItem from '../../components/notificationItems/notificationItem';
import StoreNotification from '../../components/notificationItems/storeNotification';
import './notifications.scss';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../config/contexts/AuthContext';

function Notifications() {
    const [toggleState, setToggleState] = useState(0);
    const {ShopID} = useAuth();

    const toggleTab = (index) => {
        setToggleState(index)
    }


    return (
        <div className='Notifications'>
            <Header Main />
            <div className='Notifications__Main'>
                <h2>Notifications</h2>
                {
                    ShopID ? 
                    <div className='Notifications__Main__body'>
                    <div className='tabHeader'>
                        <div className={toggleState === 0 ? "tabActive" : ""} onClick={() => toggleTab(0)}>User</div>
                        <div className={toggleState === 1 ? "tabActive" : ""} onClick={() => toggleTab(1)}>Store</div>
                    </div>
                    <div className={toggleState === 0 ? "tabContent" : "tabHide"}>
                        <NotificationItem />
                    </div>
                    <div className={toggleState === 1 ? "tabContent" : "tabHide"}>
                        <StoreNotification />
                    </div>
                </div>
                :
                <div className='Notifications__Main__body'>
                    <NotificationItem />
                </div>
                }
                
            </div>
            <FootBar />
            <Footer />
        </div>
    );
}

export default Notifications;