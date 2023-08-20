import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import FootBar from '../../components/FootBar/FootBar';
import profile from '../../props/Icons/profile-circle.svg';
import setting from '../../props/Icons/Profile.svg';
import heart from '../../props/Icons/heart.svg';
//import heartOutline from '../../props/Icons/ionicIcons/heart-outline.svg';
//import { IonIcon } from '@ionic/react';
import sell from '../../props/Icons/truck-fast.svg';
import logOutImg from '../../props/Icons/log-out.png';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import './profile.scss';
import { useNavigate } from 'react-router';
import { useAuth } from '../../config/contexts/AuthContext';
import Footer from '../../components/Footer/Footer';

function Profile() {

    const navigate = useNavigate();
    const {currentUser, logOut, userID} = useAuth();
    const [userData, setUserData] = useState([]);

   const handleLogOut = async ()=>{
    try {
        await logOut()
        
        navigate('/login')   

    } catch (error) {
        console.log(error);
    }
   }

    useEffect(()=>{

        const getData = async ()=>{
          try{
            //console.log(currentUser?.uid);
            const docRef = doc(db, "users", currentUser?.uid || userID);
            const docSnap = await getDoc(docRef);
            // console.log(auth.currentUser?.uid)
            
            if (docSnap.exists()) {
              setUserData(docSnap.data())
              //console.log("Document data:", docSnap.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }
          catch(err){
            console.log(err);
          }
        }
        getData()
      },[currentUser])

    return (
        <div className='Profile'>
            <Header Main/>

            <div className='Profile_body'>
                <div className='Profile_body_top'>
                    <img src={profile} alt="" className='userIcon' />
                    <div className='text'>
                        <p className='t1'>Hi {userData.firstName}</p>
                    </div>
                </div>

                <div className='section items' onClick={() => {
                    navigate('/update-info')
                }}>
                    <img src={setting} alt="" />
                    <p>Update Personal Info</p>
               
                </div>

                <div className='section items' onClick={() => {
                    navigate(`/wishlist`)
                }}>
                      <img src={heart} alt="" />
                    <p>Wishlist</p>
                    {/* <img src={pointer} alt="" className='pointer'/> */}
                </div>
                {
                    userData?.storeID ? 
               
                <div className='section items' onClick={() => {
                    // navigate(`/fund`);
                }}>
                    <img src={sell} alt="" />
                    <p onClick={()=>{
                        navigate(`/dashboard/${userData.storeID}`)
                    }}>My Store</p>
                    {/* <img src={pointer} alt="" className='pointer'/> */}
                </div>

                :

                <div className='section items' onClick={()=>{
                    navigate(`/seller`)
                }}>
                    <img src={sell} alt="" />
                    <p >Become a seller</p>
                    {/* <img src={pointer} alt="" className='pointer'/> */}
                </div>
                 }
               
                    <div className='section items' onClick={() => {
                  handleLogOut()
                }}>
                    <img src={logOutImg} alt="" />
                        <p>Log Out</p>
                        {/* <img src={pointer} alt="" className='pointer'/> */}
                    </div>
     </div>

            <FootBar />
            <Footer/>
        </div>
    );
}

export default Profile;