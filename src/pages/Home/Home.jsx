import React, { useState, useEffect } from 'react';
import FootBar from '../../components/FootBar/FootBar';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Store from '../../components/Stores/Store';
// import Product from '../../components/Products/Product';
// import arrow from '../../props/Icons/arrow-narrow-right.svg';
import './home.scss'
// import Banner from '../../components/Banner/Banner';
import Splash from '../../components/Splash/Splash';
import NewArrivals from '../../components/Products/NewArivals';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router';
// import PodModal from '../../components/Modals/PodModal';
// import ProductAction from '../../components/Modals/ProductAction';

function Home() {
    // const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // const [hideBar, setHidebar] = useState(false);
    const user = localStorage.getItem('currentUser');
    // const [modalShow, setModalShow] = useState(false);
    // const [actionShow, setActionShow] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        // Wait for 3 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <>
            {
                isLoading ?

                    <Splash /> :
                    <div className='Home'>
                        
                        <Header Main />
                        <div className='Home__main'>
                            <div className="Home__main__body" >
                                <BannerSlider />
                          
                                {/* <Search setSearchValue={setSearchValue}/> */}
                                <div className='container-xl Home__main__body__cover'>
                                    <div className='Home__main__body__store'>
                                        <p className='Heading'>Shop By Store</p>
                                        <div className='Home__main__body__store__product '>
                                            <div className='row' style={{ flexWrap: 'nowrap' }}>
                                                <Store />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='Home__main__body__store'>
                                        <p className='Heading'>Available Food</p>

                                        {/* <div className='Home__main__body__store__product product-grid row'> */}
                                        {/* <Product searchValue={searchValue}/> */}
                                        <NewArrivals
                                            // modalShow={modalShow}
                                            // setModalShow={setModalShow}
                                        />
                                        {/* <div className='moreBtn'><img src={arrow} alt="icon" /></div> */}
                                        {/* </div> */}
                                    </div>
                                    <div className='Home__main__body__store'>
                                        <p className='Heading'>Popular</p>
                                        {/* <div className='Home__main__body__store__product  product-grid row'> */}
                                        {/* <Product searchValue={searchValue}/> */}
                                        <NewArrivals />
                                        {/* <div className='moreBtn'><img src={arrow} alt="icon" /></div> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                                {/* <div className='bottomText'>
                    <h2 >Refer Friends and Earn</h2>
                    <p>Share your referal link with your friends, and earn points whenever they buy a product, which can be traded for discounts on products.</p>
                    </div> */}
                                {
                                    !user ?
                                        <div className='cta-cover'>
                                            <div className='cta container-xl'>
                                                <h2> Create an account to of your shopping experience.</h2>
                                                {/* <p>Sign In to get started </p>  */}
                                                <button className='btn'
                                                    onClick={() => { navigate('/login') }}
                                                >Get started</button>
                                            </div>
                                        </div>
                                        :
                                        <div className='cta-cover'>
                                            <div className='cta container-xl'>
                                                {/* <h2> Let's help you make the most of your shopping experience.</h2> */}
                                                {/* <p>Sign In to get started </p>  */}
                                                <button className='btn'
                                                    onClick={() => { navigate('/shop') }}
                                                >Explore</button>
                                            </div>
                                        </div>

                                }
                            </div>
                        </div>
                        <FootBar />
                        <Footer />
                    </div>

            }
        </>
    );
}

export default Home;