import React from 'react';
import './search.scss';
import searchIcon from '../../props/Icons/search-normal.svg';
function Search({setSearchValue}) {
    return (
        <div className='Search'>
            <div className='Search__main'>
                <input type="text" placeholder='Search Products' onChange={(e) => {setSearchValue(e.target.value.toLowerCase())}} />
                <div className='Search__main__btn'>
                    <img src={searchIcon} alt="icons" />
                </div>
            </div>
        </div>
    );
}

export default Search;