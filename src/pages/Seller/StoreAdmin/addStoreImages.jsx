import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import FootBar from "../../../components/FootBar/FootBar";
import addImage from "../../../props/Icons/Add_square.svg";
import { db, storage } from '../../../firebaseConfig';
import {  doc, updateDoc } from "firebase/firestore";
import { useAuth } from '../../../config/contexts/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import './seller.scss';


function StoreImages() {
    const {currentUser} = useAuth();
    const { storeID } = useParams();
   

    const navigate = useNavigate();
    const [Progress, setProgress] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
      const uploadImage = () => {
        const name = new Date().getTime() + image.name
        const storageRef = ref(storage, `/${storeID} Images/Background/${image.name}`);
  
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
    }, [image, storeID])


//console.log(currentUser.uid)
    const updateStoreImg = async ()=>{
        try{
            await updateDoc(doc(db, 'shop', storeID), {
                background: imgUrl
            })
            navigate(`/store-admin/${storeID}`)
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
                    <h2>Upload store background image</h2>
                    <p>Please use an image with a minimum width of 900px to avoid blurry images</p>
                </div>

                <div className='Seller__main__form'>
                  
                    <div className='Seller__main__form__image'>
                        <label for="image_prod">
                            <img src={addImage} alt="addImage" />
                            <p>Upload a background image for your store</p>
                            <p>{Progress}</p>
                            {/* <p className="size">{}</p> */}
                            <input type="file" id="image_prod" accept=".jpg, .jpeg, .png, .pdf "
                                onChange={(e) => setImage(e.target.files[0])}
                                 />
                        </label>
                    </div>
                    {/* </div> */}
                    <div className='Seller__main__form__Btn' onClick={() => {
                        updateStoreImg()
                    }}>Submit</div>
                </div>
            </div>
            <FootBar />
        </div>
    );
}

export default StoreImages;