import React from "react"
import logo from '../../props/Images/logoLight.svg';
import { Link } from "react-router-dom";
import './Footer.scss';
import { useAuth } from "../../config/contexts/AuthContext";
function Footer(){
	const {userData} = useAuth();

  return (
    <div className="Footer">
      <div className="Footer__inner">
     
		<div className="Footer__inner__main">
			<div>
			<p className="Heading"></p>
			{
                    userData?.storeID ? 
					<Link to={`/store-admin/${userData.storeID}`}>My Store</Link>
                :
			<Link to='/seller'></Link>
                  
                 }
				{/* <Link to='/'>Become a seller</Link> */}
				
			</div>
			<div className='right'>
			<p className="Heading"></p>
			<Link to='/faq'></Link>
			<Link to='/'></Link>
				
			</div>
		</div>
		<div className="bottom">
		<div className="contact">
			<p className="Heading"></p>
			<p></p>
			<p>	</p>

		</div>
		{/* <div className="right">
		<p className="Heading">Social</p>
		</div> */}
		</div>
      </div>
	  {/* <div className="final">
			<hr />
			<p>Podshack 2022</p>
		</div> */}
    </div>
  )



}
export default Footer