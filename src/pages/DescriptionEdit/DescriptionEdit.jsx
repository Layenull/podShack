import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import FootBar from "../../components/FootBar/FootBar";
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useNavigate, useParams } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuth } from '../../config/contexts/AuthContext';
import DescriptionEditTab from '../../components/DescriptionEditTab/DescriptionEditTab';
import pen from '../../props/Icons/penEdit.svg';

function DescriptionEdit(info) {
  const navigate = useNavigate()
  const { currentUser, productDta, userData } = useAuth();

  const [productInfo, setproductInfo] = useState([]);
  const { id } = useParams();
  sessionStorage.setItem('productID', id)

  useEffect(() => {
    const getProductDesc = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setproductInfo(snapshot.data());
        }
        else {
          console.log("No such document!");
        }
        // setProductName(productInfo.Name)
      }
      catch (err) {
        console.log(err);
      };
    }
    id && getProductDesc();
  }, [id]);

  const [productName, setProductName] = useState(productDta?.Name);
  const [price, setPrice] = useState(productDta?.Price);

  const [show, setShow] = useState('');

  const userRef = doc(db, "products", id)
  const updateName = async ()=>{
    await updateDoc(userRef,{
        Name: productName   
    }).then( setShow(''))
  };
  const updatePrice = async ()=>{
    await updateDoc(userRef,{
        Price: price   
    }).then( setShow(''))
  };
 




  return (
    <div className="Description">
      <Header />
      <div className='top'>
        <p>

          <input type="text"
            placeholder='Item Name'
            defaultValue={productDta?.Name}
            onChange={(e) => {setProductName(e.target.value);
                      setShow(0)
            }           
          }

          />
          <span className={`edit ${show === 0 ? 'show' : ''}`}
          onClick={updateName}>
              <img src={pen} alt="" />
          </span>
        </p>
      </div>
      <div className="Description__product">
        <div className="Description__product__left">
          <ProductSlider />
          {/* <img src={ipod} alt="img" className="Description__product__img" /> */}
          <div className="Description__product__info">
            <p className="Description__product__info__price" style={{ display: 'flex', alignItems: 'center' }}>
              {/* {productInfo.Price}  */}
              <button className={`edit  ${show === 1 ? 'show' : ''}`}
              style={{marginRight: '10px'}}
              onClick={updatePrice}
              >
                <img src={pen} alt="" />
              </button>

              <small>NGN</small>
              <input type="text"
                placeholder='Item Price'
                defaultValue={productDta?.Price}
                onChange={
                  (e) => {setPrice(e.target.value)
                setShow(1)
                  }
                }

              />
              


            </p>
            <button className="Description__product__info__cta" 
            onClick={()=>{
              navigate(`/add-images/${userData.storeID}/${id}`)
            }}
            >Images</button>
            {/* <button className="Description__product__info__cta" onClick={handleUpdate}>Cart</button> */}

          </div>

        </div>


        <div className='Description__product__right'>
          <DescriptionEditTab />

        </div>

      </div>
      <div>
      <div className='AddProducts__main__form__Btn' onClick={() => {
        // navigate('/auth-contact')
        navigate(`/store-admin/${userData?.storeID}`)
    }}>My Store</div>

      </div>

      <FootBar />
    </div>
  );
}
export default DescriptionEdit;