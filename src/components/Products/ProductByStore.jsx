import React, { useState, useEffect } from 'react';
import ipod from '../../props/Images/ipodWhite.png';
import './product.scss';
import { useParams, useNavigate } from 'react-router';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import Spinner from '../Spinner/Spinner';
import { query, where, doc, deleteDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { IonIcon } from '@ionic/react';
import heartOutline from '../../props/Icons/ionicIcons/heart-outline.svg';
import eyeOutline from '../../props/Icons/ionicIcons/eye-outline.svg';
import bagAddOutline from '../../props/Icons/ionicIcons/bag-add-outline.svg';
import '../../config/style/style-prefix.scss';
import { useAuth } from '../../config/contexts/AuthContext';
import PodModal from '../Modals/PodModal';
import ProductAction from '../Modals/ProductAction';
import DeleteModal from '../Modals/DeleteModal';


function StoreProduct({ Admin }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { storeID } = useParams();
  const { currentUser, loginID } = useAuth()
  const [modalShow, setModalShow] = useState(false);
  const [wishlistAction, setWishlistAction] = useState(false);
  const [cartAction, setCartAction] = useState(false);
  const user = localStorage.getItem('currentUser');
  const [deleteModal, setDeleteModal] = useState(false);
  const [productID, setProductID] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, 'products'), where("Store", "==", storeID));
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

  const deleteItem = async (itemID) => {
    await deleteDoc(doc(db, "products", itemID));
  }

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
  };

  if (Admin) {

    return (
      <>
    <DeleteModal
    show={deleteModal}
    onHide={() => setDeleteModal(false)}
    onDelete={
      () => { 
        deleteItem(productID);
        setDeleteModal(false)
      }}
  />
        {
          product.length < 1 ?

            <p className='h2' style={{ textAlign: 'center' }}>Products are not available</p>

            :
            <>

              {
                product && product.map((item, index) => (
                  <div className='col-6 col-md-4 col-xl-3  small-screen-product mt-15' key={index}>
                    <div class="showcase "  >

                      <div class="showcase-banner">
                        {
                          item.CoverImg?.img0 ?
                            <>
                              <img src={item.CoverImg?.img0} alt={item.Name} width="100" class="product-img default" />
                              <img src={item.CoverImg?.img1} alt="Mens Winter Leathers Jackets" width="100" class="product-img hover" />
                            </>
                            :
                            <div className='product-img placeholder'></div>
                        }


                        <p class="showcase-badge angle black">sale</p>

                        <div class="showcase-actions">

                          <button class="btn-action"
                            onClick={() => {
                              navigate(`/desc-edit/${item.id}`)
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </button>

                          <button class="btn-action"
                             onClick={() => {
                              setDeleteModal(true)
                              setProductID(item.id)
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
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
      </>
    );
  }

  else {
    return (
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

          product.length < 1 ?
            <p className='display-4' style={{ textAlign: 'center', marginTop: '20px' }}>Loading is taking a bit of time</p>

            :
            <>


              {
                product && product.map((item, index) => (
                  <div className='col-6 col-md-3 col-sm-4  small-screen-product mt-15' key={index}>


                    <div class="showcase "  >

                      <div class="showcase-banner">
                        {
                          item.CoverImg?.img0 ?
                            <>
                              <img src={item.CoverImg?.img0} alt={item.Name} width="100" class="product-img default" />
                              <img src={item.CoverImg?.img1} alt="Mens Winter Leathers Jackets" width="100" class="product-img hover" />
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
      </>
    );
  }

}


export default StoreProduct