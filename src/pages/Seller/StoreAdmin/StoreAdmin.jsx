import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header/Header';
import FootBar from '../../../components/FootBar/FootBar';
import Search from '../../../components/Search/Search';
import { useNavigate, useParams } from 'react-router';
import { db } from '../../../firebaseConfig';
import { getDoc, doc} from "firebase/firestore";
import './storeAdmin.scss';
import StoreProduct from '../../../components/Products/ProductByStore';

function StoreAdmin() {
    const [searchValue, setSearchValue] = useState('');
    const [storeData, setStoreData] = useState([]);
    const [nProgress, setNProgress] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    const { storeID } = useParams();


    useEffect(()=>{

    //   const uploadBackground =  async () => {
    //     // const name = new Date().getTime() + image.name;
    //     const storageRef = ref(storage, `/${storeID}/Background/${image.name}`);

    //     const uploadTask = uploadBytesResumable(storageRef, image);
    //     uploadTask.on('state_changed',
    //         (snapshot) => {

    //             const nprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setNProgress('Upload is ' + nprogress + '% done');
    //             console.log(snapshot.state);
    //             switch (snapshot.state) {
    //                 case 'paused':
    //                     setNProgress('Upload is paused');
    //                     break;     
    //             }
    //         },
    //         (error) => {
    //             console.log(error);
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log('File available at', downloadURL);
    //                 setImageURL(downloadURL)
                    
    //             }).then(async ()=>{
    //               //setLoading(true)
    //               try{
    //                   await updateDoc(doc(db, 'shop', storeID), {
    //                       backgroundImage: imageURL
    //                   })
    //               }
    //               catch(err) {
    //                   console.log(err);
    //                   //setLoading(false)
    //               }
                
    //             })
    //         }
    //     );
    // };
      
        const getData = async ()=>{
          try{
            //console.log(currentUser?.uid);
            const docRef = doc(db, "shop", storeID);
            const docSnap = await getDoc(docRef);
            // console.log(auth.currentUser?.uid)
            
            if (docSnap.exists()) {
              setStoreData(docSnap.data())
              // console.log(docSnap.data())
              //console.log("Document data:", docSnap.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }
          catch(err){
            console.log(err);
          }
        };
  
        storeID && getData();
        // image && uploadBackground();

      },[storeID]);

      function handleBackground (imgType){
        navigate(`/add-storeImages/${storeID}/${imgType}`)
      }
      function handleLogo (){
        navigate(`/add-storeLogo/${storeID}`)
      }



      


    return (
        <div className='storeAdmin'>
            <Header/>
        <div className='storeAdmin__main'>
        <div className='storeAdmin__main__top'>
            <div className='storeAdmin__main__top__cover '  
            >
            <div style={{width: '100%', height:'100%',backgroundImage : `url(${storeData?.background})` }} id='Background'
              onClick={(e)=>{handleBackground(e.target.id)}}
            >

            </div>
                <p>Click to add banner image</p>

                <div className='StoreLogo ' id='Logo'
                // style={{backgroundImage : `url(${storeData?.logo})`}}
                onClick={()=>{handleLogo()}}
                >
                  <img className='logoImg' src={storeData?.logo} alt=''/>
                  
                <p>logo</p>
                  </div> 
            </div>
            <div className='storeAdmin__main__top__btn btn btn-lg' onClick={()=>{
                navigate(`/add-products/${storeID}`)
            }}>
                Add
            </div>
            <div className='Text'>
                <h2>{storeData?.storeName}</h2>
                <p className='Location'>{storeData?.Location}</p>
            </div>
        </div>
            <div className='storeAdmin__main__search'><Search setSearchValue={setSearchValue}/></div>
            {/* <Product/> */}
         <div className='storeAdmin__main__body '>
          <div className='product-grid row container-xl'>
          <StoreProduct searchValue={searchValue} Admin/>
          </div>
        
         </div>
        </div>
            
            <FootBar/>
        </div>
    );
}

export default StoreAdmin;