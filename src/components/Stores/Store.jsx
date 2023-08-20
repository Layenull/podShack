import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import './store.scss';
function Store() {

const navigate = useNavigate();
const [product, setProduct] = useState([]);

useEffect(() => {
    // setLoading(true)
    const q = query(collection(db, 'shop'), where("Visible", "==", true));
    const unsub = onSnapshot(q, (snapshot) => {
    // const unsub = onSnapshot(collection(db, 'shop'), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });
    //   setLoading(false)
      setProduct(list)
    }, (err) => {
      console.log(err)
    })
    return () => {
      unsub();
    }

  }, []);

    return (
        product.map((item, index) => (
        <div className='col-4' style={{minWidth: '250px', marginRight: '0px',}} key={index}>
        <div className='Store' onClick={()=>{
            navigate(`/store/${item.id}`)
        }}
        // style={{ backgroundImage: `url(${item?.background})`}}
        >
           <div className='Store__img'></div>
           <div  className='Store__text'>
            <p>{item?.storeName}</p>
           </div>
        </div>
        </div>
        ))
    );
}

export default Store;