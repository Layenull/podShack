import React, { useState, useEffect } from 'react';
import './product.scss';
import { useNavigate } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc, addDoc, collection, serverTimestamp, onSnapshot } from "firebase/firestore";
import Spinner from '../Spinner/Spinner';
import '../../config/style/style-prefix.scss';
import { IonIcon } from '@ionic/react';
//import { heartOutline, eyeOutline, repeatOutline, star, starOutline, bagAddOutline } from 'ionicons';
import heartOutline from '../../props/Icons/ionicIcons/heart-outline.svg';
import eyeOutline from '../../props/Icons/ionicIcons/eye-outline.svg';
// import repeatOutline from '../../props/Icons/ionicIcons/repeat-outline.svg';
import bagAddOutline from '../../props/Icons/ionicIcons/bag-add-outline.svg';
import '../../config/style/style-prefix.scss';
import { useAuth } from '../../config/contexts/AuthContext';
import PodModal from '../Modals/PodModal';
import ProductAction from '../Modals/ProductAction';

function Product({ searchValue }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, loginID } = useAuth()
  const [modalShow, setModalShow] = useState(false);
  const [wishlistAction, setWishlistAction] = useState(false);
  const [cartAction, setCartAction] = useState(false);
  const user = localStorage.getItem('currentUser');

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });
      setLoading(false)
      setProduct(list)
    }, (err) => {
      console.log(err)
    })
    return () => {
      unsub();
    }

  }, []);

  const handleCart = async (id) => {
    if (!user) {
      setModalShow(true)
    }
    else {
      const docRef = doc(db, 'products', id);
      const snapshot = await getDoc(docRef);
      let cartList = []
      cartList.push(snapshot.data())
      const productData = cartList[0]
      // consolelog
      try {
        await addDoc(collection(db, 'users', currentUser?.uid || loginID, "cart"), {
          productData,
          productID: id,
          created: serverTimestamp()
        })
        setCartAction(!cartAction)
      }
      catch (err) {
        console.log(err);
      };
    }
  };

  const handleWishlist = async (id) => {
    if (!user) {
      setModalShow(true)
      setWishlistAction(false)
    }
    //const userById = doc(db, "users", auth.currentUser?.uid);
    else {
      const docRef = doc(db, 'products', id);
      const snapshot = await getDoc(docRef);
      let cartList = []
      cartList.push(snapshot.data())
      const productData = cartList[0]
      // consolelog
      try {
        await addDoc(collection(db, 'users', currentUser?.uid || loginID, "wishlist"), {
          productData,
          productID: id,
          created: serverTimestamp()
        })
        setWishlistAction(!wishlistAction)
      }
      catch (err) {
        console.log(err);
      };
    };
  }

  const data = Object.values(product);

  const search_parameters = ['Name', 'Category', 'Store']
  function search(product) {
    return product.filter((item) =>
      search_parameters.some((parameter) =>
        item[parameter].toLowerCase().includes(searchValue)
      )
    );
  }

  return (

    <>
      
      {
        product.length < 1 ?

          <p className='h2' style={{ textAlign: 'center' }}>Please hold on while products load</p>

          :

          <>
        <PodModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ProductAction
        show={wishlistAction}
        onHide={() => setWishlistAction(false)}
        name={'wishlist'}
      />
      <ProductAction
        show={cartAction}
        onHide={() => setCartAction(false)}
        name={'cart'}
      />
            {
              search(data).map((item, index) => (
                <div className=' col-6 col-sm-4  col-md-3 mb-30 ' key={index}>
                  <div class="showcase ">

                    <div class="showcase-banner">
                      {
                        item.CoverImg?.img0 ?
                          <>
                            <img src={item.CoverImg.img0} alt={item.Name} width="100" class="product-img default" />
                            <img src={item.CoverImg.img1} alt="Mens Winter Leathers Jackets" width="100" class="product-img hover" />
                          </>
                          :
                          <div className='product-img placeholder'></div>
                      }

                      <p class="showcase-badge angle black">sale</p>

                      <div class="showcase-actions">

                        <button class="btn-action"
                         onClick={() => {
                          // setWishlistAction(!wishlistAction);
                          handleWishlist(item.id);
                         }}
                        >
                          <IonIcon src={heartOutline}></IonIcon>
                        </button>

                        <button class="btn-action"
                        onClick={() => {
                          navigate(`/product-desc/${item.id}`)
                        }}
                        >
                          <IonIcon src={eyeOutline}></IonIcon>
                        </button>

                        {/* <button class="btn-action">
                    <IonIcon src={repeatOutline}></IonIcon>
                  </button> */}

                        <button class="btn-action"
                          onClick={() => {
                            // setCartAction(!cartAction);
                            handleCart(item.id);
                          }}
                        >
                          <IonIcon src={bagAddOutline}></IonIcon>
                        </button>

                      </div>

                    </div>

                    <div class="showcase-content"
                      onClick={() => {
                        navigate(`/product-desc/${item.id}`)
                      }}
                    >

                      <a href="#" class="showcase-category">{item.Category}</a>

                      <a href="#">
                        <h3 class="showcase-title">{item.Name}</h3>
                      </a>

                      <div class="price-box">
                        <p class="price">₦ {item.Price}</p>
                        {/* <del>$75.00</del> */}
                      </div>

                    </div>

                  </div>
                </div>
              ))
            }
          </>
      }
    </>


  );
}

export default Product