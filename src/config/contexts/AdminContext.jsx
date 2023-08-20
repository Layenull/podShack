import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { query, collection,  onSnapshot, where, orderBy } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { useAuth } from './AuthContext';
// import { useParams } from 'react-router';
// import { useNavigate } from 'react-router';

const AdminContext = React.createContext();

export function useUserInfo() {
    return useContext(AdminContext)
}

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [orders, setOrders] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const { userData} = useAuth();
    const [storeNotifications, setStoreNotifications] = useState([])
    const ShopID = localStorage.getItem("ShopID");
    // const { storeID } = useParams();

    //Get List of users
    useEffect(() => {
        // setLoading(true)
        const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            // setLoading(false)
            setUsers(list)
        }, (err) => {
            console.log(err)
        })
        return () => {
            unsub();
        }

    }, []);

    //Get list of stores 
    useEffect(() => {
        // setLoading(true)
        const unsub = onSnapshot(collection(db, 'shop'), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            // setLoading(false)
            setStores(list)
        }, (err) => {
            console.log(err)
        })
        return () => {
            unsub();
        }

    }, []);

    //get total orders
    useEffect(() => {
        // setLoading(true)
        const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            // setLoading(false)
            setOrders(list)
        }, (err) => {
            console.log(err)
        })
        return () => {
            unsub();
        }

    }, []);

    // get delivered Orders
    useEffect(() => {
        const q = query(collection(db, 'orders'), where("delivered", "==", true));
        const unsub = onSnapshot(q, (snapshot) => {
            // const unsub = onSnapshot(collection(db, ''), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            // setLoading(false)
            setDelivered(list)
        }, (err) => {
            console.log(err)
        })
        return () => {
            unsub();
        }

    }, []);

    //get total orders
    useEffect(() => {
        // setLoading(true)
        const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            // setLoading(false)
            setOrders(list)
        }, (err) => {
            console.log(err)
        })
        return () => {
            unsub();
        }

    }, []);


    useEffect(  () =>  {

        const q = query(collection(db,'shop', ShopID,   "notifications"), orderBy("created", "desc"));
        const unsub =  onSnapshot( q , (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() })
            });
            setStoreNotifications(list)
          }, (err) => {
            console.log(err)
          })
          return () => {
            unsub();
          }

        }, [ShopID]);

        


    const value = {
        users,
        stores,
        orders,
        delivered,
       storeNotifications
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}

export default UserProvider;