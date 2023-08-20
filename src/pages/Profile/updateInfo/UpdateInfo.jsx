import React, { useState } from 'react';
import user from '../../../props/Icons/user (2).svg';
import emailIcon from '../../../props/Icons/email.svg';
//import passwordIcon from '../../../props/Icons/security-safe.svg';
import whatsappIcon from '../../../props/Icons/whatsapp-1.svg';
import phoneIcon from '../../../props/Icons/phone-solid.svg';
import telegramIcon from '../../../props/Icons/telegram.svg';
import instagramIcon from '../../../props/Icons/instagram.svg';
import './updateInfo.scss';
import Spinner from '../../../components/Spinner/Spinner';
import { useAuth } from '../../../config/contexts/AuthContext';
import Header from '../../../components/Header/Header';
import { db } from '../../../firebaseConfig';
import { doc,  updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router';

function UpdateInfo() {
    const navigate = useNavigate();
    const {userData, userID} = useAuth();
    const [firstName, setFirstName] = useState(userData?.firstName);
    const [lastName, setLastName] = useState(userData?.lastName);
    const [email, setEmail] = useState(userData?.email);
    const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber);
    const [telegram, setTelegram] = useState(userData?.telegram);
    const [whatsapp, setWhatsapp] = useState(userData?.whatsapp);
    const [instagram, setInstagram] = useState(userData?.instagram);
    const [loading, setLoading] = useState(false);
   

//    const userRef = doc(db, 'users', userID);
   const updateDetails = async ()=>{
    setLoading(true)
    try{
        await updateDoc(doc(db, "users", userID), {
            firstName: firstName,   
            lastName: lastName, 
            email: email, 
            phoneNumber: phoneNumber, 
            telegram: telegram, 
            whatsapp: whatsapp, 
            instagram: instagram
        })
        navigate('/profile')
    }
    catch(err) {
        console.log(err);
        setLoading(false)
    }
  
  };
//   console.log(userData)


    return (
        <div  className='UpdateInfo'>
            <Header/>
        <div className='UpdateInfo__main'>
        <h2>User Info</h2>
        <div className='UpdateInfo__main__input'>
            <div className='icon-div'><img src={user} alt="" /></div>
            <input type="text" placeholder='First Name' defaultValue={userData?.firstName} onChange={(e) => setFirstName(e.target.value)}  />
        </div>

        <div className='UpdateInfo__main__input'>
            <div className='icon-div'><img src={user} alt="" /></div>
            <input type="text" placeholder='Last Name'  defaultValue={userData?.lastName} onChange={(e) => setLastName(e.target.value)}  />
        </div>

        <div className='UpdateInfo__main__input'>
            <div className='icon-div'><img src={emailIcon} alt="" /></div>
            <input type="email" placeholder='Email' defaultValue={userData?.email} readOnly />
        </div>

        <h2 className='contact'>Contact Info</h2>

        <div className='UpdateInfo__main__input'>
            <div className='icon-div'><img src={phoneIcon} alt=""  /></div>
            <input type="text" placeholder='Phone Number' defaultValue={userData?.phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
        </div>
        <div className='UpdateInfo__main__input'>
            <div className='icon-div'><img src={telegramIcon} alt=""  /></div>
            <input type="text" placeholder='Telegram' defaultValue={userData?.telegram} onChange={(e) => {setTelegram(e.target.value)}}/>
        </div>
        <div className='UpdateInfo__main__input'>
            <div className='icon-div larger'><img src={instagramIcon} alt=""  /></div>
            <input type="text" placeholder='Instagram' defaultValue={userData?.instagram} onChange={(e) => {setInstagram(e.target.value)}}/>
        </div>
        <div className='UpdateInfo__main__input'>
            <div className='icon-div larger'><img src={whatsappIcon} alt=""  /></div>
            <input type="text" placeholder='WhatsApp' defaultValue={userData?.whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
        </div>

      
        <div className='UpdateInfo__Btn' onClick={updateDetails}> {loading? <Spinner/>: 'Update'}</div>
      
    </div>
        </div>
    );
}

export default UpdateInfo;