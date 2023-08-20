import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import FootBar from '../../components/FootBar/FootBar';
import Search from '../../components/Search/Search';
import Product from '../../components/Products/Product';
import { ShopBanner } from '../../components/Banner/Banner';
import './shop.scss';
// import PodModal from '../../components/Modals/PodModal';
function Shop() {
    const [searchValue, setSearchValue] = useState('');
    // const [modalShow, setModalShow] = useState(false);
    // const [hideFootBar,  setHideFootBar] = useState(false);
    return (
        <div className='Shop'>
             <Header/>
             {/* <div className="Shop__Search">
                <Search setSearchValue={setSearchValue}/>
                </div> */}
                <div className='Shop__banner' >
                    <ShopBanner/>
                </div> 
                <div className='container-md Shop__Search' >
                <Search setSearchValue={setSearchValue}/>   
                </div>
               
             <div className='Shop__Main container-xl'>
                <div className='Shop__Main__product product-grid row' data-masonry='{"percentPosition": true }'>
                    <Product searchValue={searchValue}/>
                </div>
                
             </div>
            {/* <div className={`${hideFootBar ? "hide" : "show"}`}> */}
            <FootBar />
            {/* </div> */}
           
        </div>
    );
}

export default Shop;