import React, { useState } from 'react';
import Header from '../../../components/Header/Header';
import FootBar from "../../../components/FootBar/FootBar";
import addImage from "../../../props/Icons/Add_square.svg";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';
import '../seller.scss';
import { useParams, useNavigate } from 'react-router';


function AddImages() {
    const { productID, storeID } = useParams();
    const navigate = useNavigate();

    const [imageURL, setImageURL] = useState([]);
    const [coverImages, setCoverImages] = useState([]);
    const [coverObj, setCoverObj] = useState({});
    const [images, setImages] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const [Progress, setProgress] = useState('');
    const [nProgress, setNProgress] = useState('');
    const [imgObj, setImgObj] = useState({});
    // const storeID = sessionStorage.getItem('storeID');
    // const productID = sessionStorage.getItem('productID');

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i]
            newImage['id'] = Math.random()
            setImages((prevState) => [...prevState, newImage])

        }
    };

    const handleChangeCover = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const coverImage = e.target.files[i]
            coverImage['id'] = Math.random()
            setCoverImages((prevState) => [...prevState, coverImage])

        }
    };

    useEffect(() => {
        const uploadCoverImage = async () => {
            const promises = []

            if(coverImages.length === 2){
                coverImages.map((image) => {
                    //const name = new Date().getTime() + image.name;
                    const storageRef = ref(storage, `/${storeID} productCover/${image.name}`);
        
                    const uploadTaskN = uploadBytesResumable(storageRef, image);
        
                    promises.push(uploadTaskN)
                    uploadTaskN.on('state_changed',
                        (snapshot) => {
        
                            const nprogress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            // setProgress(progress)
                            setNProgress('Upload is ' + nprogress + '% done');
                            console.log(snapshot.state);
                            switch (snapshot.state) {
                                case 'paused':
                                    setNProgress('Upload is paused');
                                    break;
                            }
                        },
                        (error) => {
                            console.log(error);
                        },
                        async () => {
                            await getDownloadURL(uploadTaskN.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                setImageURL((prevState) => [...prevState, downloadURL])
                            });
                        }
                    );
        
                });
            }
            
            // if (Promise.all(promises)) {
            //     // alert("all images uploaded successfully")
            // }
           
    
    
        }
        coverImages && uploadCoverImage();
        
    }, [ coverImages, storeID]);

    useEffect(() => {
        const uploadImages = async () => {
            const promises = []
            if(images.length === 2){
                images.map((image) => {
                    const name = new Date().getTime() + image.name;
                    const storageRef = ref(storage, `/${storeID}/${image.name}`);
    
                    const uploadTask = uploadBytesResumable(storageRef, image);
    
                    promises.push(uploadTask)
                    uploadTask.on('state_changed',
                        (snapshot) => {
    
                            const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            // setProgress(progress)
                            setProgress('Upload is ' + progress + '% done');
                            console.log(snapshot.state);
                            switch (snapshot.state) {
                                case 'paused':
                                    setProgress('Upload is paused');
                                    break;
                         
                            }
                        },
                        (error) => {
                            console.log(error);
                        },
                        async () => {
                            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                setImgUrl((prevState) => [...prevState, downloadURL])
                            });
                        }
                    );
    
                });
            }
            if (Promise.all(promises)) {
                // alert("all images uploaded successfully")
            }
            //  .then(()=>{})
            //  .catch((err)=> console.log(err))


        }
        images && uploadImages();
        
    }, [images, storeID]);

    // uploadImage();
    imgUrl.forEach((elem, i) => {
        imgObj[`img${i}`] = elem
        //setImgObj(elem)
    })
    imageURL.forEach((elem, i) => {
        coverObj[`img${i}`] = elem
        //setCoverObj(elem)
    })

    console.log(imgObj)
    console.log(coverImages)
    console.log(coverObj)

    const handleUpload = async () => {
        // const docRef = updateDoc(doc(db, 'products', productID));
        await updateDoc(doc(db, 'products', productID), {
      
            Images: imgObj,
            CoverImg: coverObj

        })

        .then(navigate(`/desc-edit/${productID}`));
    }
    //console.log("image", images);
    //console.log("url", imgUrl);
    return (
        <div className='AddProducts'>
            <Header />
            <div className='AddProducts__main'>
                <div className='AddProducts__main__top'>
                    <h2>Add Products</h2>
                    <p>Please add product images</p>
                </div>

                <p style={{color: 'red'}}>Images should be 1 mb or less
                <br />Please allow each section to reach 100% before continuing
                </p>
                

                <div className='AddProducts__main__form'>

                <div className="AddProducts__main__form__image">
                    <label htmlFor="image_pro">
                        <img src={addImage} alt="addImage" />
                        <p>Upload 2 cover images </p>
                        <p> Please use professional images</p>
                        <p>Uploaded: {coverImages.length}</p>
                        <p>{nProgress}</p>
                        {/* <p className="size">{}</p> */}
                        <input type="file" id="image_pro" accept=".jpg, .jpeg, .png, .PNG"
                            onChange={handleChangeCover} multiple/>
                    </label>
                </div>

                    <div className="AddProducts__main__form__image">
                        <label htmlFor="image_prod">
                            <img src={addImage} alt="addImage" />
                            <p>Upload subsidiary images </p>
                            <p>Uploaded: {images.length}</p>
                            <p>{Progress}</p>
                            {/* <p className="size">{}</p> */}
                            <input type="file" id="image_prod" accept=".jpg, .jpeg, .png, .PNG"
                                onChange={handleChange}
                                multiple />
                        </label>
                    </div>



                    <div className='AddProducts__main__form__Btn' onClick={() => {
                        // navigate('/auth-contact')
                        handleUpload()
                    }}>Continue</div>
                </div>
            </div>
            <FootBar />
        </div>
    );
}

export default AddImages;