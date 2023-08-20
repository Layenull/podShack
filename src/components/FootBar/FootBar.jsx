import React, { useState } from 'react';
import home from '../../props/Icons/Home.svg';
import menu from '../../props/Icons/bag.svg';
import profile from '../../props/Icons/profile-circle.svg';
import notification from '../../props/Icons/notification.svg';
import { Link, useMatch, useResolvedPath  } from 'react-router-dom';
import PodModal from '../Modals/PodModal';

import './footBar.scss';
import { updateCurrentUser } from 'firebase/auth';


function FootBar() {
  const user = localStorage.getItem('currentUser');
  const [modalShow, setModalShow] = useState(false);

    // const [hideBar, setHidebar] = useState();


    return (
        <>
        <PodModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
        <div className={`FootBar`}>
            <div className="Operations">
                <ul>
                    <CustomLink to='/'><img src={home} alt="footImg" /></CustomLink>
                    <CustomLink to='/shop'><img src={menu} alt="footImg" /></CustomLink>
                    {
                        !user ?
                        <li
                        onClick={
                            ()=>{
                                setModalShow(true)
                            }
                        }
                        >
                           <img src={notification} alt="footImg" /> 
                        </li>
                        :
                        <CustomLink to='/notification'><img src={notification} alt="footImg" /></CustomLink>
                    }
                     {
                        !user ?
                        <li
                        onClick={
                            ()=> setModalShow(true)
                        }
                        >
                          <img src={profile} alt="footImg" /> 
                        </li>
                        :
                        <CustomLink to='/profile'><img src={profile} alt="footImg" /></CustomLink>
                    }
                    {/* <CustomLink to='/notification'><img src={notification} alt="footImg" /></CustomLink> */}
                 

                </ul>
            </div>
        </div>
        </>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname })
    return (
        <li className={isActive ? "pageActive" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )

}

export default FootBar;