import React, { useState, useEffect } from 'react';
import './product.scss';
import { useNavigate } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc, addDoc, collection, serverTimestamp, onSnapshot } from "firebase/firestore";
import Spinner from '../Spinner/Spinner';
import { query, orderBy, limit } from "firebase/firestore";
import { IonIcon } from '@ionic/react';
// import { heartOutline, eyeOutline, repeatOutline, star, starOutline, bagAddOutline } from 'ionicons';
import heartOutline from '../../props/Icons/ionicIcons/heart-outline.svg';
import eyeOutline from '../../props/Icons/ionicIcons/eye-outline.svg';
import bagAddOutline from '../../props/Icons/ionicIcons/bag-add-outline.svg';
import '../../config/style/style-prefix.scss';
import { useAuth } from '../../config/contexts/AuthContext';
import { useRef } from 'react';
import PodModal from '../Modals/PodModal';
import ProductAction from '../Modals/ProductAction';

function NewArrivals() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, loginID } = useAuth();
  const user = localStorage.getItem('currentUser');

  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [wishlistAction, setWishlistAction] = useState(false);
  const [cartAction, setCartAction] = useState(false);

  const scrl = useRef(null)

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift); // Updates the latest scrolled postion

    //For checking if the scroll has ended
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, 'products'), orderBy("Store", "desc"), limit(7));
    const unsub = onSnapshot(q, (snapshot) => {
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
        // setCartAction(!cartAction)
      }
      catch (err) {
        console.log(err);
      };
    }
  };

  const handleWishlist = async (id) => {
    if (!user) {
      setModalShow(true)
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
        // setWishlistAction(!wishlistAction)
      }
      catch (err) {
        console.log(err);
      };
    };
  }

  return (
    <div className='scrollContainer'>
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


      {scrollX !== 0 && (
        <button className="scrollBtn prev"
          onClick={() => slide(-100)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
        </button>
      )}

      <div className='Home__main__body__store__product product-grid row' ref={scrl}>
        {
          loading ?
            <div className='loadingSpinner'>  <Spinner /> </div>
            :
            <>

              {
                product && product.map((item, index) => (
                  <div className='col-md-3  mobile-smaller mt-15' key={index}>
                    <div class="showcase "  >

                      <div class="showcase-banner">
                        {
                          item.CoverImg?.img0 ?
                            <>
                              <img src={item.CoverImg.img0} alt={item.Name} width="100" class="product-img default" />
                              <img src={item.CoverImg.img1} alt="Mens Winter Leathers Jackets" width="100" class="product-img hover"/>
                            </>
                            :
                            <div className='product-img placeholder'></div>
                        }


                        <p class="showcase-badge angle black">sale</p>

                        <div class="showcase-actions">

                          <button class="btn-action"
                            onClick={() => { 
                              setWishlistAction(!wishlistAction);
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

                          <button class="btn-action"
                            onClick={() => { 
                              setCartAction(!cartAction);
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


                )
                )
              }
            </>
        }

      </div>
      {!scrolEnd && (
        <button className="scrollBtn next" onClick={() => slide(+100)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default NewArrivals