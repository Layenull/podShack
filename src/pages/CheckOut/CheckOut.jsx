import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router';
import { useAuth } from '../../config/contexts/AuthContext';
// import ipod from '../../props/Images/ipodWhite.png';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import './checkOut.scss';
import EmailModal from '../../components/Modals/EmailModal';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, limit, getDocs, writeBatch, serverTimestamp, addDoc } from "firebase/firestore";
import { usePaystackPayment } from 'react-paystack';
import emailjs from '@emailjs/browser';

function CheckOut() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const { userID, userData, cartItems, currentUser, loginID } = useAuth();
  const [medium, setMedium] = useState();
  const [contact, setContact] = useState();
  const [modalShow, setModalShow] = useState(false);
  const handleChange = (e) => {
    setMedium(e.target.value);
    setContact(e.target.id);
  }
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index) => {
    setToggleState(index)
  }

  let priceList = [];
  let itemList = [];

  cartItems?.forEach(data => {
    priceList.push(Number(data?.productData.Price));
    itemList.push(data?.productData.Name);

  });
  let sum = 0;

  priceList.forEach(item => {
    sum += item;
  });




  const config = {
    reference: (new Date()).getTime().toString(),
    email: `${userData?.email}`,
    amount: sum,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    deleteCollection(db, collection(db, 'users', currentUser?.uid || loginID, "cart"), 20);
    sellerOrderNotification();
    adminOrderNotification();
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const initializePayment = usePaystackPayment(config);

  //  deleteCart

  function deleteCollection(db, collectionRef, batchSize) {
    const q = query(collectionRef, orderBy("created"), limit(batchSize));

    return new Promise((resolve) => {
      deleteQueryBatch(db, q, batchSize, resolve);
    });
  }

  async function deleteQueryBatch(db, query, batchSize, resolve) {
    const snapshot = await getDocs(query);

    // When there are no documents left, we are done
    let numDeleted = 0;
    if (snapshot.size > 0) {
      // Delete documents in a batch
      const batch = writeBatch(db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      numDeleted = snapshot.size;
    }

    if (numDeleted < batchSize) {
      resolve();
      return;
    }

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    setTimeout(() => {
      deleteQueryBatch(db, query, batchSize, resolve);
    }, 0);
  }


  const userOrderNotification = async () => {
    try {
      await addDoc(collection(db, 'users', currentUser?.uid || loginID, "notifications"), {
        title: 'Order Confirmation',
        message: `Your order for ${itemList.toString()} at ₦ ${sum}, has been recieved and is being processed. You will be contacted via ${contact}, for delivery and payment.`,
        created: serverTimestamp()
      })
    }
    catch (err) {
      console.log(err);
    };
  };

  const sellerOrderNotification = () => {
    cartItems?.forEach(async (data) => {
      try {
        await addDoc(collection(db, 'shop', data.productData.Store, "notifications"), {
          title: 'Order Confirmation',
          message: `An order for ${itemList.toString()} at ₦ ${sum}, has been placed by ${userData?.firstName} ${userData?.lastName}. Their preferred mode of contact is ${contact} : ${medium}.`,
          created: serverTimestamp()
        })
        // To send order details to seller dashboard
        await addDoc(collection(db, 'shop', data.productData.Store, "orders"), {
          product: `${itemList.toString()}`,
          amount: `${sum}`,
          user: `${userData?.firstName} ${userData?.lastName}`,
          created: serverTimestamp(),
          delivered: false
        })
      }
      catch (err) {
        console.log(err);
      };
    });

  };

  const adminOrderNotification = () => {
    cartItems?.forEach(async (data) => {
      try {
        await addDoc(collection(db, "orders"), {
          product: `${itemList.toString()}`,
          amount: `${sum}`,
          user: `${userData?.firstName} ${userData?.lastName}`,
          created: serverTimestamp(),
          delivered: false,
          store: data.productData.Store
        })
      }
      catch (err) {
        console.log(err);
      };
    });

  };



  var templateParams = {
    to_name: `${userData?.firstName} ${userData?.lastName}`,
    message: `Your order for ${itemList.toString()} at ₦ ${sum}, has been recieved and is being processed. You will be contacted via ${contact}, for delivery and payment.`,
    disclaimer: `Please Note: Only make Payment after delivery.`,
    user_email: `${userData?.email}`
  };

  function sendEmail() {
    emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAILJS_KEY)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        setModalShow(true);
        sellerOrderNotification();
        userOrderNotification()
        cartItems.empty()
      }, function (error) {
        console.log('FAILED...', error);
      });
  }



  return (
    <div className='CheckOut'>
      <Header CheckOut />
      <div className='CheckOut__main container-xl'>
        <div className='CheckOut__main__list'>
          <h2>Delivery Address</h2>
          <p>Please select a default medium of communication</p>
          <div className='CheckOut__main_items'>
            {userData.phoneNumber ?
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="Phone-Number"
                  value={userData?.phoneNumber}
                  onChange={handleChange}
                />
                <label class="form-check-label" htmlFor="Phone-Number">
                  Phone Number: {userData.phoneNumber}
                </label>
              </div>
              :
              ''
            }
            {userData.instagram ?
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="Instagram"
                  value={userData?.instagram}
                  onChange={handleChange}
                />
                <label class="form-check-label" htmlFor="Instagram">
                  Instagram: {userData.instagram}
                </label>
              </div>
              :
              ''
            }
            {userData.telegram ?
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="Telegram"
                  value={userData?.telegram}
                  onChange={handleChange}
                />
                <label class="form-check-label" htmlFor="Telegram">
                  Telegram: {userData.telegram}
                </label>
              </div>
              :
              ''
            }
            {userData.whatsapp ?
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="WhatsApp"
                  value={userData?.whatsapp}
                  onChange={handleChange}
                />
                <label class="form-check-label" htmlFor="WhatsApp">
                  WhatsApp: {userData?.whatsapp}
                </label>
              </div>
              :
              ''
            }
          </div>
        </div>

        <div className='CheckOut__main__summary'>
          <h2>Summary</h2>
          {
            cartItems && cartItems.map((data, index) => (
              <div className='CheckOut__main__items' key={index}>
                <div className='CheckOut__main__items__inner'>
                  <div className='CheckOut__main__items__left'>
                    <div className='CheckOut__main__items__img'>
                      <img src={data?.productData.CoverImg?.img0} alt="a product" />
                    </div>
                    <div className='CheckOut__main__items__text'>
                      <p className='Heading'>{data?.productData.Name}</p>
                      {/* <p className='Desc'>Desc Lorem ipsum dolor, sit amet  Lorem ipsum dolor, sit amet</p> */}
                      <p className='Price MobilePrice'>₦ {data?.productData.Price} <small>NGN</small></p>
                    </div>
                  </div>
                  <p className='Price MainPrice'>₦ {data?.productData.Price} <small>NGN</small></p>
                </div>
              </div>
            ))
          }
          <div className='CheckOut__main__items__text mb-2'>
            <p className='Heading'>Total: ₦ {sum} <small>NGN</small></p>
          </div>

          <div className='d-block form-check '>
            <input class=" form-check-input" type="radio" name="flex" id="Paystack"
            value={userData?.whatsapp}
            onChange={() => toggleTab(0)}
            />
            <label class="form-check-label paymentMethod" htmlFor="Paystack">
              PayStack
            </label></div>
            {/* {car} */}
          

          <div  className='d-block form-check '>
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="WhatsApp"
              value={userData?.whatsapp}
              onChange={() => toggleTab(1)}
            />
            <label class="form-check-label paymentMethod" htmlFor="Delivery">
              Pay on delivery
            </label></div>
           

          <button className={toggleState === 0 ? 'CheckOut__main__Btn btn ' : 'hide'} onClick={() => {
            initializePayment(onSuccess, onClose);
            // sendEmail();
            
          }}
          >Proceed (₦ {sum})</button>
          <button className={toggleState === 1 ? 'CheckOut__main__Btn btn ' : 'hide'} onClick={() => {
            // initializePayment(onSuccess, onClose);
            sendEmail();
            deleteCollection(db, collection(db, 'users', currentUser?.uid || loginID, "cart"), 20);
          }}
          >Proceed (₦ {sum})</button>

        </div>
      </div>

      <EmailModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default CheckOut;