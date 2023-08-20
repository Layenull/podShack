import React, { useEffect, useState } from 'react';
import './description.scss';
import Header from '../../components/Header/Header';
import FootBar from "../../components/FootBar/FootBar";
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useNavigate, useParams } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from '../../config/contexts/AuthContext';
import DescriptionTab from '../../components/DescriptionTabs/DescriptionTab';
import PodModal from '../../components/Modals/PodModal';

function Description() {
const navigate = useNavigate()
const {currentUser, userID} = useAuth();
const [colour, setColour] = useState('');
const [size,  setSize] = useState('');
const [modalShow, setModalShow] = useState(false);

const user = localStorage.getItem('currentUser');

// const handleBuy =()=>{
    
// }

const handleCart = async () => {

    //const userById = doc(db, "users", auth.currentUser?.uid);

    const docRef = doc(db, 'products', id);
    const snapshot = await getDoc(docRef);
    let cartList = []
    cartList.push(snapshot.data())
    const productData = cartList[0]
    if (!user) {
      setModalShow(true)
    }
    // consolelog
    else{
      try {
        await addDoc(collection(db, 'users', currentUser?.uid || userID , "cart" ), {
          productData,
          productID : id,
          created: serverTimestamp(),
          colour,
          size
        })
        .then(navigate('/cart'))
      }
      catch (err) {
        console.log(err);
      };
      
    }
    
  };

const [data, setData] = useState([]);
  const { id } = useParams();

  

  useEffect(() => {
    const getProductDesc = async () => {
        try {
          const docRef = doc(db, 'products', id);
          const snapshot = await getDoc(docRef);
    
          if (snapshot.exists()) {
            setData(snapshot.data());
          }
          else {
            console.log("No such document!");
          }
        }
        catch (err) {
          console.log(err);
        };
      }
      id && getProductDesc();
  }, [id]);

    return (
        <div className="Description">
            <Header />
            <div className='top'>
                <p>{data.Name}</p>
            </div>
            <div className="Description__product">
              <div className="Description__product__left">
                <ProductSlider/>
                {/* <img src={ipod} alt="img" className="Description__product__img" /> */}
                <div className="Description__product__info">
                    <p className="Description__product__info__price">
                        {data.Price} <small>NGN</small>
                    </p>
                    {/* <button className="Description__product__info__cta" >Buy</button> */}
                    <button className="Description__product__info__cta" onClick={()=>{
                      handleCart();
                    
                    }}>Cart</button>

                </div>

                </div>

           
       <div className='Description__product__right'>
        <DescriptionTab
        setColour={setColour}
        colour={colour}
        setSize={setSize}
        size={size}
        />
      
                </div>
    
            </div>
            <div>

            </div>

            <FootBar />
            <PodModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        </div>
    );
}
export default Description;