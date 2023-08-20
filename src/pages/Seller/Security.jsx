import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import FootBar from "../../components/FootBar/FootBar";
import location from '../../props/Icons/location.svg';
import shop from '../../props/Icons/building-4.svg';
import addImage from "../../props/Icons/Add_square.svg";
import { db, storage } from '../../firebaseConfig';
import {  doc, updateDoc } from "firebase/firestore";
import { useAuth } from '../../config/contexts/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './seller.scss';


function Security() {
    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const {currentUser} = useAuth();
    const storeName = sessionStorage.getItem('storeName');
    const storeID = sessionStorage.getItem('storeID');
    const navigate = useNavigate();
    const [Progress, setProgress] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [image, setImage] = useState('');

    const handleFocus = (e) => {
      e.target.parentNode.style.borderColor = "#6f42c1";
      // setHide(true)
  }
  const handleBlur = (e) => {
      e.target.parentNode.style.borderColor = "lightgray";
      // setHide(hide)
  }

    useEffect(() => {
      const uploadImage = () => {
        const name = new Date().getTime() + image.name
        const storageRef = ref(storage, `/${storeName} KYC/${image.name}`);
  
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
          (snapshot) => {
  
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // setProgress(progress)
            setProgress('Upload is ' + progress + '% done');
            console.log(snapshot.state);
            switch (snapshot.state) {
              case 'paused':
                setProgress('Upload is paused');
                break;
                // case `${progress === 100%}`:
                //   setProgress('Upload is running');
                // break;
              // case 'running':
              //   setProgress('Upload is running');
              //   break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setImgUrl(downloadURL)
            });
          }
        );
  
  
      }
      image && uploadImage();
    }, [image])


//console.log(currentUser.uid)
    const updateDetails = async (e)=>{
        //setLoading(true)
        e.preventDefault();
        try{
            await updateDoc(doc(db, 'shop', storeName), {
                bankName:bankName,
                accountName: accountName,
                accountNumber: accountNumber,
                accountType: accountType,
                idDocument: imgUrl
            })
            navigate('/profile')
        }
        catch(err) {
            console.log(err);
            //setLoading(false)
        }
      
      };

    return (
        <div className='Seller'>
            <Header />
            <div className='Seller__main'>
                <div className='Seller__main__top'>
                    <h2>Become A Seller</h2>
                    <p>Please fill out this form  to become a seller</p>
                </div>

                <form className='Seller__main__form'
                onSubmit={updateDetails}
                >
                  
                    <div className='Seller__main__form__image'>
                        <label for="image_prod">
                            <img src={addImage} alt="addImage" />
                            <p>Upload a valid id e.g. NIMC, driver's license, international passport e.t.c</p>
                            <p>{Progress}</p>
                            {/* <p className="size">{}</p> */}
                            <input type="file" id="image_prod" accept=".jpg, .jpeg, .png, .pdf "
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                                 />
                        </label>
                    </div>

                    <h3>Bank Account Info</h3>

                    <div className='Seller__main__form__input'>
                        <div className='icon-div'><img src={shop} alt="" /></div>
                        <input type="text" placeholder='Bank Name' required 
                        onChange={(e) => setBankName(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        />

                    </div>
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'><img src={location} alt="" /></div>
                        <input type="text" placeholder='Account Number' required 
                        onChange={(e) => setAccountNumber(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        />
                    </div>
                  
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'><img src={location} alt="" /></div>
                        <input type="text" placeholder='Account Name' required 
                        onChange={(e) => setAccountName(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        />
                    </div>
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'><img src={location} alt="" /></div>
                        <input type="text" placeholder='Savings or Current' required 
                        onChange={(e) => setAccountType(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        />
                    </div>
                    {/* </div> */}
                    <button className='Seller__main__form__Btn' type='submit'>Submit</button>
                </form>
            </div>
            <FootBar />
        </div>
    );
}

export default Security;