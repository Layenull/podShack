import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import FootBar from "../../components/FootBar/FootBar";
import location from '../../props/Icons/location.svg';
import shop from '../../props/Icons/building-4.svg';
// import Category from '../../props/Icons/Category.svg';
import CategoryDrop from './CategoryDrop';
import { db } from '../../firebaseConfig';
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, updateDoc, doc } from "firebase/firestore";
import { useAuth } from '../../config/contexts/AuthContext';
import './seller.scss';


function Seller() {
    const [storeName, setStoreName] = useState('');
    const [State, setState] = useState('');
    const [City, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [bizContact, setBizContact] = useState('');
    const [bizCategory, setBizCategory] = useState('');
    const [bizDuration, setBizDuration] = useState('');
    const [loading, setLoading] = useState(false);
    const {currentUser} = useAuth();
    const [error,  setError] = useState('');

    function Validate() {
      
         if (storeName.length  === 0  || State.length  === 0  || City.length  === 0  || bizContact.length  === 0  || bizCategory.length  === 0 || bizDuration.length === 0  ) {
            setError("It appears some fields are empty")
            setLoading(false);
            console.log(storeName.length)
            return;
        }
        else{
            setError('');
            setLoading(true);
        }
        return;

    }

    const createStore = async (e)=>{
        e.preventDefault()
        Validate();    
        try{
           const shopref = await setDoc(doc(db, 'shop', storeName), {
                storeName: storeName,   
                state: State, 
                city: City, 
                zipCode: zipCode, 
                bizContact: bizContact, 
                bizCategory: bizCategory,
                bizDuration: bizDuration,
                Visible: false
            })
            await updateDoc(doc(db, "users", currentUser && currentUser?.uid),{
                isSeller : true,
                storeID : storeName
            }).then(
                navigate('/security')
            )
    
            
            sessionStorage.setItem('storeName', storeName)
            sessionStorage.setItem('shopID', shopref?.id)
        }
        catch(err) {
            console.log(err);    
            setError('Failed to create account');
            setLoading(false)
        }
      
      };
      //console.log(currentUser?.uid)
    const navigate = useNavigate();
    const handleFocus = (e) => {
        e.target.parentNode.style.borderColor = "#6f42c1";
        // setHide(true)
    }
    const handleBlur = (e) => {
        e.target.parentNode.style.borderColor = "lightgray";
        // setHide(hide)
    }
    return (
        <div className='Seller'>
            <Header />
            <div className='Seller__main'>
                <div className='Seller__main__top'>
                    <h2>Become A Seller</h2>
                    <p>Please fill out this form  to become a seller</p>
                </div>

                <form className='Seller__main__form'
                onSubmit={createStore}
                >
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'>
                        <div className='icon-overlay'></div>
                            <img src={shop} alt="" /></div>
                        <input type="text" placeholder='Store Name' required
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                    </div>
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'>
                        <div className='icon-overlay'></div>
                            <img src={location} alt="" /></div>
                        <input type="text" placeholder='State' required
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setState(e.target.value)}
                        />

                    </div>
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'>
                        <div className='icon-overlay'></div>
                            <img src={location} alt="" /></div>
                        <input type="text" placeholder='City' required
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setCity(e.target.value)}
                        />

                    </div>
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'>
                        <div className='icon-overlay'></div>
                            <img src={location} alt="" /></div>
                        <input type="text" placeholder='Zip Code' required
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setZipCode(e.target.value)}
                        />

                    </div>

                    <div className='Seller__main__form__input'>
                        <div className='icon-div'><div className='icon-overlay'></div><img src={location} alt="" /></div>
                        <input type="text" placeholder=' Business email or phone number' required
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setBizContact(e.target.value)}
                        />
                    </div>
                    <CategoryDrop selectedCategory={bizCategory} setSelectedCategory={setBizCategory} />
                    <div className='Seller__main__form__input'>
                        <div className='icon-div'>
                        <div className='icon-overlay'></div>
                            <img src={location} alt="" /></div>
                        <input type="Number" placeholder='Typical delivery duration (in days)' required
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setBizDuration(e.target.value)}
                        />

                    </div>
                    {/* </div> */}
                    {error && <p className='error'>{error}</p>}
                    <button className='Seller__main__form__Btn' type='submit' disabled={loading} >{loading? '...': 'Next'}</button>
                </form>
            </div>
            <FootBar />
        </div>
    );
}

export default Seller;