import React, { useState } from 'react';
import './auth.scss';
import logo from '../../props/Images/logoDark-small.svg';
// import user from '../../props/Icons/user (2).svg';
import emailIcon from '../../props/Icons/email.svg';
import passwordIcon from '../../props/Icons/security-safe.svg';
// import { auth } from '../../firebaseConfig';
// import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../config/contexts/AuthContext';

function PasswordReset() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,  setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { reset} = useAuth();

    const handleReset = async (e)=>{
        if ( email.length  === 0  ) {
            setError("It appears your email field is empty"); 
            e.preventDefault() 
        }
        else{
            setError('');
            setLoading(true);
        }
       try{
        await reset(email).then(()=>{
            alert("A reset link has been sent to your mailbox, check your spam if not found in your inbox.")
            setLoading(false)
        })
            
       }
       catch(err){
        console.log(err)
        console.log(err.code)
        setError(err.code);
        setLoading(false)
        // e.preventDefault();
       }
    }

    return (
        <div className='Auth'>
            
          
           <div className='Auth__main'>
           <h2>Password Reset </h2> 
                  <div className='Auth__main__input'>
                    {/* <img src="" alt="" /> */}
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={emailIcon} alt="" /></div>
                    <input type="text" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                {/* <div className='Auth__main__input'>
                     <img src="" alt="" /> 
                    <div className='icon-div'>
                        <div className='icon-overlay'></div>
                        <img src={passwordIcon} alt="" /></div>
                    <input type="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
                </div> */}
            {error && <p className='error'>{error}</p>}
                <div className='Auth__Btn' onClick={() => {
                         handleReset();
                        }}> {loading ? <Spinner/> : 'Reset'} </div>
            </div> 
            {/* <p className='forgotPass'>Forgot password?</p> */}
            
            <div className='final'><p>Don't have an account yet? <span onClick={() => {
                    navigate('/register')
                }}>sign up</span></p></div>
        </div>
    );
}

export default PasswordReset;