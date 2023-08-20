import React, { useState } from 'react';
import './auth.scss';
import logo from '../../props/Images/logoDark-small.svg';
import user from '../../props/Icons/user (2).svg';
import emailIcon from '../../props/Icons/email.svg';
import passwordIcon from '../../props/Icons/security-safe.svg';
import { useNavigate } from 'react-router';
import { auth, db } from '../../firebaseConfig';
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, } from "firebase/firestore";
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../config/contexts/AuthContext';



function Register() {
    //const auth = getAuth(app);
   // const db = getFirestore(app);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,  setConfirmPassword] = useState('');
    const [error,  setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {signUp, Uid} = useAuth();

    function Validate() {
        if(password !== confirmPassword){
            setError("Passwords do not match")
        }
        if(password.length < 8){
            setError("Password must be atleast 8 characters long")
        }
        else if (firstName.length  === 0  || lastName.length  === 0  || password.length  === 0  || email.length  === 0  || confirmPassword.length  === 0  ) {
            setError("It appears some fields are empty")
        }
        else{
            setError('');
            setLoading(true);
        }
    } 

    const handleRegister = async ()=>{
        Validate();
       try {
         await signUp(email, password);
            // temporary working solution (not best practice),
           await setDoc(doc(db, "users", Uid[0]), {
                firstName : firstName,
                lastName : lastName,
                email  : email,
                password: password
            }).then(
                navigate('/auth-contact')
            )
         
       //  console.log(currentUser)

        // const loguser = await signInWithEmailAndPassword(auth, email, password);
        // sessionStorage.setItem('userID', auth.currentUser.uid)
        
       } catch (error) {
        console.log(error);
       setError('Failed to create account');
       setLoading(false)
       }
    }
    // console.log(currentUser)

    return (
        <div className='Auth'>
            
           
            <div className='Auth__main'>
            <h2>Sign Up</h2>
                <div className='Auth__main__input'>
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={user} alt="" /></div>
                    <input type="text" placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}  />
                </div>

                <div className='Auth__main__input'>
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={user} alt="" /></div>
                    <input type="text" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}  />
                </div>

                <div className='Auth__main__input'>
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={emailIcon} alt="" /></div>
                    <input type="email" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}  />
                </div>
                <div className='Auth__main__input'>
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={passwordIcon} alt=""  /></div>
                    <input type="password" placeholder='Password'  onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <div className='Auth__main__input'>
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={passwordIcon} alt="" /></div>
                    <input type="password" placeholder='Confirm Password'  onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>
                  {error && <p className='error'>{error}</p>}
                <div className='Auth__Btn' onClick={handleRegister }> {loading ? <Spinner/> : 'Next'}</div>
                <div className='final'><p>Already have an account? <span onClick={() => {
                    navigate('/login')
                }}> Log in</span></p></div>
            </div>
        </div>
    );
}

export default Register;