import React, { useState } from 'react';
import './auth.scss';
import logo from '../../props/Images/logoDark-small.svg';
// import user from '../../props/Icons/user (2).svg';
import emailIcon from '../../props/Icons/email.svg';
import passwordIcon from '../../props/Icons/security-safe.svg';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../config/contexts/AuthContext';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,  setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {logIn} = useAuth();

    const handleSignIn = async (e)=>{
        if ( password.length  === 0  || email.length  === 0  ) {
            setError("It appears some fields are empty"); 
            e.preventDefault() 
        }
        else{
            setError('');
            setLoading(true);
        }
       try{
        await logIn(email, password)
            navigate(-1)
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
           <h2>Log in </h2> 
                  <div className='Auth__main__input'>
                    {/* <img src="" alt="" /> */}
                    <div className='icon-div'>
                    <div className='icon-overlay'></div>
                        <img src={emailIcon} alt="" /></div>
                    <input type="text" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className='Auth__main__input'>
                    {/* <img src="" alt="" /> */}
                    <div className='icon-div'>
                        <div className='icon-overlay'></div>
                        <img src={passwordIcon} alt="" /></div>
                    <input type="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            {error && <p className='error'>{error}</p>}
                <div className='Auth__Btn' onClick={() => {
                         handleSignIn();
                        }}> {loading ? <Spinner/> : 'Log In'} </div>
            </div> 
            <Link to='/forgot-password'><p className='forgotPass'>Forgot password?</p></Link>
            
            <div className='final'><p>Don't have an account yet? <span onClick={() => {
                    navigate('/register')
                }}>sign up</span></p></div>
        </div>
    );
}

export default Login;