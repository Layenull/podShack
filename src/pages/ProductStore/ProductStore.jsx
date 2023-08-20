import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import FootBar from '../../components/FootBar/FootBar';
import Search from '../../components/Search/Search';
//import Product from '../../components/Products/Product';
import './productStore.scss';
import StoreProduct from '../../components/Products/ProductByStore';
import { useNavigate, useParams } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc } from "firebase/firestore";




function ProductStore() {

  const [searchValue, setSearchValue] = useState('');
  const [storeData, setStoreData] = useState([]);

  // const navigate = useNavigate();
  const { storeID } = useParams();

  useEffect(() => {

    const getData = async () => {
      try {
        //console.log(currentUser?.uid);
        const docRef = doc(db, "shop", storeID);
        const docSnap = await getDoc(docRef);
        // console.log(auth.currentUser?.uid)

        if (docSnap.exists()) {
          setStoreData(docSnap.data())
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    getData()
  }, [storeID])
  return (
    <div className='storeAdmin'>
      <Header />
      <div className='storeAdmin__main'>
        <div className='storeAdmin__main__top'>
          <div className='storeAdmin__main__top__cover '
          >
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${storeData?.background})` }} id='Background'>
              
            </div>

            <div className='StoreLogo ' id='Logo'>
                <img src={`${storeData?.logo}`} alt=""  className='logoImg'/>
            </div>
          </div>
          
          <div className='Text'>
            <h2>{storeData?.storeName}</h2>
            <p className='Location'>{storeData?.Location}</p>
          </div>
        </div>
        <div className='storeAdmin__main__search'><Search setSearchValue={setSearchValue} /></div>
        {/* <Product/> */}
        <div className='storeAdmin__main__body '>
          <div className='product-grid row container-xl'>
            <StoreProduct searchValue={searchValue} />
          </div>

        </div>
      </div>

      <FootBar />
    </div>
  );
}

export default ProductStore;