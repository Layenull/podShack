import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import './cart.scss';
import { useNavigate } from 'react-router';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from '../../config/contexts/AuthContext';
import DeleteModal from '../../components/Modals/DeleteModal';
import FootBar from '../../components/FootBar/FootBar';



function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, loginID } = useAuth();
  const [modalShow, setModalShow] = useState(false);
  const [productID, setProductID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, 'users', currentUser?.uid || loginID, "cart"), orderBy("created", "desc"));
    // const ref = collection(db, 'users', currentUser?.uid || loginID , "cart");
    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });
      setLoading(false)
      setItems(list)
      // console.log(items);
    }, (err) => {
      console.log(err)
    })
    return () => {
      unsub();
    }

  }, [currentUser?.uid, loginID]);


  const deleteItem = async (itemID) => {
    await deleteDoc(doc(db, "users", currentUser?.uid || loginID, "cart", itemID))   
  }
  localStorage.setItem('cartAmount', items.length)

  // console.log(localStorage.getItem('cartAmount'));

  let priceList = [];

  items.forEach(data => {
    priceList.push(Number(data.productData.Price))
  });
  let checkOutList = [...priceList]

  let sum = 0;

  checkOutList.forEach(item => {
    sum += item;
  });

  return (
    <div className="Cart">
<DeleteModal
    show={modalShow}
    onHide={() => setModalShow(false)}
    onDelete={
      () => { 
        deleteItem(productID);
        setModalShow(false)
      }}
  />

      <Header />
      <div className='Cart__main container-xl'>
        {/* <h2>Cart</h2> */}
        {/* <div></div> */}
        <div className='Cart__main__list'>
          <h2>Cart</h2>
          {

            items.length < 1 ?
              <p>You have no items in your cart</p>
              :
              <>
                {
                  items.map((data, index) => (
                    <div className='Cart__main__items' key={index}>

                      {/* <h2>Cart</h2> */}
                      <div className='Cart__main__items__inner'  >
                        <div className='Cart__main__items__left'>
                          <div className='Cart__main__items__img'>
                            <img src={data.productData.CoverImg?.img0} alt="a product" />
                          </div>
                          <div className='Cart__main__items__text'>
                            <p className='Heading'>{data.productData.Name}</p>
                            <p>{data?.colour}</p>
                            {/* <p className='Desc'>Desc Lorem ipsum dolor, sit amet  Lorem ipsum dolor, sit amet</p> */}
                            <p className='Price MobilePrice'>₦ {data.productData.Price} <small>NGN</small></p>
                          </div>
                        </div>
                        <p className='Price MainPrice'>₦ {data.productData.Price} <small>NGN</small></p>
                      </div>
                      <div className='Cart__main__items__footer'>
                        <div className=''
                          onClick={() => {
                            setModalShow(true)
                            setProductID(data.id)
                          }}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg></div>
                        <div>
                  
                        </div>
                      </div>

                    </div>

                  ))
                }
              </>
          }



        </div>
        <div className='Cart__main__summary'>
          <div className='Cart__main__summary__heading'><p>Cart Summary</p></div>
          <div className='Cart__main__summary__price'> <p>Sub total</p> <p><small>NGN</small> {sum}</p> </div>
          <button className='btn'
            onClick={() => {
              navigate(`/check-out`)
            }}
          >Check out</button>
        </div>
      </div>
      <FootBar/>
      <Footer />
    </div>
  );
}
export default Cart;