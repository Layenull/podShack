import React, {useState} from 'react';
import cart from '../../props/Icons/cart-2.svg';
import profile from '../../props/Icons/profile-circle.svg';
import notification from '../../props/Icons/notification.svg';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../../config/contexts/AuthContext';
import menu from  '../../props/Icons/menu-1.svg';
import home from '../../props/Icons/Home.svg';
import bag from '../../props/Icons/bag.svg';
import './ipodNav.scss';
import PodModal from '../Modals/PodModal';

function IPodNav() {
    const {cartList} = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const user = localStorage.getItem('currentUser');
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
        <PodModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
        <div className="IPodNav">

            <img src={menu} alt="menu" className='menu'
            onClick={()=>{
                setShowMenu(!showMenu)
            }}
            />

            <div className={`IPodNav__list ${showMenu ? 'meuDIsplay' : ''}`} >
                {/* <div className='desktop'> */}
                    <CustomLink to='/'><img src={home} alt="footImg" /><p>Home</p></CustomLink>
                    <CustomLink to='/shop'><img src={bag} alt="footImg" /><p>Shop</p></CustomLink>
                    {/* <CustomLink to='/notification'><img src={notification} alt="footImg" /><p>Notifications</p></CustomLink>
                    <CustomLink to='/profile'><img src={profile} alt="footImg" /><p>Profile</p></CustomLink>
                    <CustomLink to='/cart'><div><img src={cart} alt="" /> {
                        cartList ?
                            <span className='notification'>{0 || cartList}</span>
                            :
                            ''
                    }</div>  <p>Cart</p> </CustomLink> */}
                    {/* <img src={menu} alt="" /> */}
                {/* </div> */}
                        {
                       !user ?

                        <li onClick={  ()=> setModalShow(true)} >
                        <img src={notification} alt="footImg" /><p>Notifications</p>
                        </li>
                        :
                        <CustomLink to='/notification'><img src={notification} alt="footImg" /><p>Notifications</p></CustomLink>
                    }
                    {
                        !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                        <img src={profile} alt="footImg" /><p>Profile</p>
                        </li>
                        :
                        <CustomLink to='/profile'><img src={profile} alt="footImg" /><p>Profile</p></CustomLink>
                    }
                    {
                        !user ?
                        <li onClick={  ()=> setModalShow(true)} >
                         <img src={cart} alt="" /> <p>Cart</p>
                        </li>
                        :
                        <CustomLink to='/cart'><div><img src={cart} alt="" /> {
                            cartList ?
                                <span className='notification'>{0 || cartList}</span>
                                :
                                ''
                        }</div>  <p>Cart</p> </CustomLink>
                    } 
                    

            </div>


        </div>
        </>
    );
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

export default IPodNav;