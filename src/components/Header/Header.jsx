import React, { useState } from 'react';
//import menu from '../../props/Icons/menu-1.svg';
import logo from '../../props/Images/logoDark-small.svg';
import cart from '../../props/Icons/cart-2.svg';
import arrow from '../../props/Icons/arrow-left.svg';
import profile from '../../props/Icons/profile-circle.svg';
import notification from '../../props/Icons/notification.svg';
import { useNavigate } from 'react-router';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../../config/contexts/AuthContext';
import Search from '../Search/Search';
import './header.scss';
import IPodNav from '../iPodNav/iPodNav';
import PodModal from '../Modals/PodModal';



function Header({ Main, CheckOut }) {
    const navigate = useNavigate()
    const {cartList, notificationAmount} = useAuth()
    const user = localStorage.getItem('currentUser');
    const [modalShow, setModalShow] = useState(false);
    // const cartList = localStorage.getItem('cartAmount');
    if (Main) {
        return (
            <>
            <PodModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
            <div className='Header'>
                <div className='Header__inner'>
                    
                 <div className='Header__inner__search'  onClick={()=>navigate('/shop')}><Search /></div>
                    <div className='Icons'>
                    {
                        !user ?
                        <li
                        onClick={
                            ()=> setModalShow(true)
                        }
                        >
                          <img src={cart} alt="" />
                        </li>
                        :
                        <CustomLink to='/cart'> <img src={cart} alt="" />
                        {
                            cartList?
                             <span className='notification'>{0 || cartList}</span>
                             :
                             ''
                        }
                        </CustomLink>
                        // <CustomLink to='/profile'><img src={profile} alt="footImg" /></CustomLink>
                    }
                        
                        {/* <img src={menu} alt="" /> */}
                    </div>
                    <div className='desktop'>
                        <CustomLink to='/'><p>Home</p></CustomLink>
                        <CustomLink to='/shop'><p>Shop</p></CustomLink>
                        {
                        !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                         <img src={notification} alt="footImg" />
                        </li>
                        :
                        <CustomLink to='/notification'><img src={notification} alt="footImg" /> {
                        notificationAmount?
                             <span className='notification'>{0 || notificationAmount}</span>
                             :
                             ''
                        }
                        </CustomLink>
                    }
                    {
                       !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                        <img src={profile} alt="footImg" />
                        </li>
                        :
                        <CustomLink to='/profile'><img src={profile} alt="footImg" /></CustomLink>
                    }
                    {
                        !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                         <img src={cart} alt="" />
                        </li>
                        :
                        <CustomLink to='/cart'> <img src={cart} alt="" />  {
                            cartList?
                             <span className='notification'>{0 || cartList}</span>
                             :
                             ''
                        }</CustomLink>
                    }          
                    </div>
                    <IPodNav/>
                </div>
            </div>
            </>
        );
    }
    else if (CheckOut) {
        return (
            <div className='Header'>
                <div className='Header__inner order'>
                    <div className='Icons'>
                        <img src={arrow} alt="" onClick={() => {
                            navigate(-1)
                        }} />
                    </div>
                    <div className='desktop'>
                        <img src={arrow} alt="" onClick={() => {
                            navigate(-1)
                        }} />
                    </div>
                    <div className='logo'>
                        {/* <img src={logo} alt="" onClick={() => {
                        navigate('/')
                    }} /> */}
                       <p> Order Confirmation</p>
                        {/* PodShack */}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
            <PodModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
            <div className='Header'>
                <div className='Header__inner'>
                    <div className='Icons'>
                        <img src={arrow} alt="" onClick={() => {
                            navigate(-1)
                        }} />
                    </div>
                    <div className='logo'>
                        <img src={logo} alt="" onClick={() => {
                            navigate('/')
                        }} />
                        {/* PodShack */}
                    </div>
                    <div className='Icons'>
                    {
                       !user ?
                        <li
                        onClick={
                            ()=> setModalShow(true)
                        }
                        >
                          <img src={cart} alt="" />
                        </li>
                        :
                        <CustomLink to='/cart'> <img src={cart} alt="" />
                        {
                            cartList?
                             <span className='notification'>{0 || cartList}</span>
                             :
                             ''
                        }
                        </CustomLink>
                        // <CustomLink to='/profile'><img src={profile} alt="footImg" /></CustomLink>
                    }
                        
                        {/* <img src={menu} alt="" /> */}
                    </div>
                    <div className='desktop'>
                        <CustomLink to='/'><p>Home</p></CustomLink>
                        <CustomLink to='/shop'><p>Shop</p></CustomLink>
                        {
                        !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                         <img src={notification} alt="footImg" />
                        </li>
                        :
                        <CustomLink to='/notification'><img src={notification} alt="footImg" />
                        {
                        notificationAmount?
                             <span className='notification'>{0 || notificationAmount}</span>
                             :
                             ''
                        }
                        </CustomLink>
                    }
                    {
                        !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                        <img src={profile} alt="footImg" />
                        </li>
                        :
                        <CustomLink to='/profile'><img src={profile} alt="footImg" /></CustomLink>
                    }
                    {
                       !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                         <img src={cart} alt="" />
                        </li>
                        :
                        <CustomLink to='/cart'> <img src={cart} alt="" />  {
                            cartList?
                             <span className='notification'>{0 || cartList}</span>
                             :
                             ''
                        }</CustomLink>
                    }   
                        {/* <img src={menu} alt="" /> */}   
                    </div>
                    <IPodNav/>
                </div>
            </div>
            </>
        );
    }

}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname })
    return (
        <Link className={isActive ? "pageActive" : ""} to={to} {...props}>
            {children}
        </Link>
    )

}



export default Header;