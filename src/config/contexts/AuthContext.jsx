import React, { useContext, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { useEffect } from 'react';
import { doc, getDoc, query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../../firebaseConfig';
// import { useNavigate } from 'react-router';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [Uid, setUid] = useState([]);
  const [userData, setUserData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [productDta, setProductDta] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [storeNotifications, setStoreNotifications] = useState([]);
  const id = sessionStorage.getItem('productID');


  const signUp = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    Uid.push(res.user.uid)
    localStorage.setItem('loginID', res.user.uid)
    //console.log(Uid);

    await sendEmailVerification(auth.currentUser)
  }

  const logIn = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password)

    localStorage.setItem('loginID', res.user.uid)
    //localStorage.setItem("userID", res.user.uid);
  }
  function logOut() {
    signOut(auth);
    localStorage.clear();
  }
  const reset = async (email) => {
    await sendPasswordResetEmail(auth, email, {
      url: 'https://podshack.com.ng/login'
    })
  }
  // sendPasswordResetEmail(auth, email)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(auth.currentUser.uid));
      // setLoading(false);
    })


    return () => {
      unsub();
      getCart();
      getNotifications();
    }

  }, []);
  
  const loginID = localStorage.getItem('loginID')
  localStorage.setItem("userID", loginID);
  const userID = localStorage.getItem("userID");

  const getCart = async () => {
    const q = query(collection(db, 'users', currentUser?.uid || loginID, "cart"), orderBy("created", "desc"));
    // const ref = collection(db, 'users', currentUser?.uid || loginID , "cart");
    const cartUnsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });

      setCartItems(list)
      // console.log(cartItems);
    }, (err) => {
      console.log(err)
    })
  };
  getCart();

  const cartList = cartItems.length;

  
  const getData = async () => {
    try {
      //console.log(currentUser?.uid);
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
      // console.log(auth.currentUser?.uid)

      if (docSnap.exists()) {
        setUserData(docSnap.data())
        //console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  getData();

  
  localStorage.setItem("ShopID", userData?.storeID);
  const ShopID = localStorage.getItem("ShopID");

  const getNotifications = async () => {
    const q = query(collection(db, 'users', currentUser?.uid || loginID,   "notifications"), orderBy("created", "desc"));
        const unsub =  onSnapshot( q , (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() })
            });
            setNotifications(list)
          }, (err) => {
            console.log(err)
          })
          // return () => {
          //   unsub();
          // }

  };
  getNotifications();

  // const getStoreNotifications = async () =>  {

  //   const q = query(collection(db, 'shop', ShopID,   "notifications"), orderBy("created", "desc"));
  //   const unsub =  onSnapshot( q , (snapshot) => {
  //       let list = [];
  //       snapshot.docs.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() })
  //       });
  //       setStoreNotifications(list)
  //     }, (err) => {
  //       console.log(err)
  //     })
      
  //   }
  //   getStoreNotifications();
  const notificationAmount = notifications.length + storeNotifications.length;
 

  // useEffect
  const getProductDta = async () => {
    try {
      //console.log(currentUser?.uid);
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      // console.log(auth.currentUser?.uid)

      if (docSnap.exists()) {
        setProductDta(docSnap.data())
        //console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  id && getProductDta();

  

  // console.log(userData)
  localStorage.setItem("userEmail", userData.email);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    reset,
    Uid,
    userID,
    userData,
    productDta,
    loginID,
    cartList,
    cartItems,
    notificationAmount,
    ShopID
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;