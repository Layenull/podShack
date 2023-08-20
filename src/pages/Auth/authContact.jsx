import React, {useState} from 'react';
import './auth.scss';
import logo from '../../props/Images/logoDark-small.svg';
import whatsappIcon from '../../props/Icons/whatsapp-1.svg';
import phoneIcon from '../../props/Icons/phone-solid.svg';
import telegramIcon from '../../props/Icons/telegram.svg';
import instagramIcon from '../../props/Icons/instagram.svg';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router';
import { doc, updateDoc, addDoc, serverTimestamp, collection} from "firebase/firestore";
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../config/contexts/AuthContext';

function AuthContact() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [Instagram, setInstagram] = useState('');
    const [Telegram, setTelegram] = useState('');
    const [Whatsapp, setWhatsapp] = useState('');
    const {currentUser, loginID} = useAuth();
    const [loading, setLoading] = useState(false);

    const welcomeNotification = async () => {
        try {
          await addDoc(collection(db, 'users', currentUser?.uid || loginID, "notifications" ), {
            title: 'Hurray',
            message: 'Welcome to Podshack, we hope you have an amazing shopping experience',
            created: serverTimestamp()
          })
        }
        catch (err) {
          console.log(err);
        };
      };

    const addContact = async ()=>{
        // const res = await createUserWithEmailAndPassword(auth, email, password);
        // const loguser = await signInWithEmailAndPassword(auth, email, password);
        await updateDoc(doc(db, "users", currentUser && currentUser.uid), {
            phoneNumber : phoneNumber,
            instagram : Instagram,
            telegram  : Telegram,
            whatsapp: Whatsapp
        }) 
        .then(
            setLoading(true),
            welcomeNotification(),
            navigate('/')
        );
    }

    

    return (
        <div className='Auth'>
            <img src={logo} className='logo' alt="" />
           
           <div className='Auth__main'>
           <h2>Contact Info</h2>
           <p>Please fill out at least one of these fields</p>
                <div className='Auth__main__input'>
                    {/* <img src="" alt="" /> */}
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={phoneIcon} alt="" /></div>
                    <input type="text" placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
              
                  <div className='Auth__main__input'>
                    {/* <img src="" alt="" /> */}
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={instagramIcon} alt="" /></div>
                    <input type="text" placeholder='Instagram Handle' onChange={(e) => setInstagram(e.target.value)}/>
                </div>
                <div className='Auth__main__input'>
                    {/* <img src="" alt="" /> */}
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={telegramIcon} alt="" /></div>
                    <input type="text" placeholder='Telegram Username' onChange={(e) => setTelegram(e.target.value)}/>
                </div>
                <div className='Auth__main__input'>
                    {/* <img src="" alt="" /> */}
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={whatsappIcon} alt="" /></div>
                    <input type="text" placeholder='WhatsApp' onChange={(e) => setWhatsapp(e.target.value)}/>
                </div>

                <div className='Auth__Btn' onClick={() => {
                            addContact()
                        }}> {loading ? <Spinner/> : 'Finish'}</div>
            </div> 
        </div>
    );
}

export default AuthContact;