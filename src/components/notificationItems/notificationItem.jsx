import React, { useEffect , useState}  from 'react';
import './notificationItems.scss';
import {  query,collection, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { useAuth } from '../../config/contexts/AuthContext';

function NotificationItem() {
    const {currentUser, loginID} = useAuth();
    const [notifications, setNotifications] = useState();

    useEffect(  () =>  {

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
          return () => {
            unsub();
          }

        }, []);

        const deleteItem = async(id)=>{
            await deleteDoc(doc(db, "users", currentUser?.uid || loginID , "notifications", id));
          }

    return (
        <>
        {

        notifications ?
        <>
        {
            notifications.length < 1 ?
            'You have no notifications' 
            :
            <>
            {
               notifications && notifications.map((item, index) => (
                    <div className="notificationItem" key={index}>
           
            <div className="notificationItem__upper">
                <div className="notificationItem__upper__top">
                    <div className="top-main">
                        {/* <img src={profile2} alt="img" /> */}
                        <div className="notificationItem__upper__top__text">
                            <p>{item?.title}</p>
                            {/* <p>HALLO</p> */}
                            <p>{item.created.toDate().toString().slice(0, 21)}</p>
                            {/* <p>{Date()}</p> */}
                        </div>
                    </div>
                    {/* <div className="dot"></div> */}
                </div>
                <p className="notificationItem__upper__text">
                    {item?.message}
                </p>
                <div className='deleteBin'
                onClick={()=>{
                    deleteItem(item?.id)
                }}
                >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
            </div>
            </div>
            
        </div>
                ))
            }
            </>
         
         }
        </>
        :
        'You have no notifications'
        }
        </>
    );
}

export default NotificationItem;