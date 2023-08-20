import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useAuth } from '../../config/contexts/AuthContext';
import pen from '../../props/Icons/penEdit.svg';
import Dropdown from '../ReusableDropdown/Dropdown';

function DescriptionEditTab() {
  const { currentUser, productDta } = useAuth();

  const { id } = useParams();

  const [toggleState, setToggleState] = useState(0);
  const [drop, showDrop] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index)
  }

  const [condition, setCondition] = useState(productDta?.Condition);
  const [ram, setRam] = useState(productDta?.Ram);
  const [colour, setColour] = useState([]);
  const [storage, setStorage] = useState(productDta?.DeviceStorage);
  const [processor, setProcessor] = useState(productDta?.Processor);
  const [battery, setBattery] = useState(productDta?.Battery);
  const [sizes, setSizes] = useState(productDta?.Sizes);
  const [descriptionVal, setDescriptionVal] = useState(productDta?.Description);
  
  let nlist = ['red', 'black']
  
  // let colourList = [...nlist.toString(), 'Chhdh', 'ndndndn', 'bndlek']
let colourList = []
productDta?.Colour?.forEach((item)=>{
  colourList.push(item)
})
useEffect(()=>{
  setColour(colourList)
},[colourList])
// colourList.push( 'Chhdh', 'ndndndn', 'bndlek' )
  const [show, setShow] = useState('');

  function handleKeyDown(e){
    if(e.key !== 'Enter') return
    const value = e.target.value    
    if(!value.trim()) return
        setColour(...colour, value)
        e.target.value = ''
        showDrop(true);
}
function removeTag(index){
  setColour(colour.filter((el, i) => i !== index))
}

  const userRef = doc(db, "products", id)
  const updateCondition = async () => {
    await updateDoc(userRef, {
      Condition: condition
    }).then(setShow(''))
  };
  const updateRam = async () => {
    await updateDoc(userRef, {
      Ram: ram
    }).then(setShow(''));
  };
  const updateColour = async () => {
    await updateDoc(userRef, {
      Colour: colour
    }).then(setShow(''));
  };
  const updateStorage = async () => {
    await updateDoc(userRef, {
      DeviceStorage: storage
    }).then(setShow(''));
  };
  const updateProcessor = async () => {
    await updateDoc(userRef, {
      Processor: processor
    }).then(setShow(''));
  };
  const updateBattery = async () => {
    await updateDoc(userRef, {
      Battery: battery
    }).then(setShow(''));
  };
  const updateSizes = async () => {
    await updateDoc(userRef, {
      Sizes: sizes
    }).then(setShow(''));
  };
  const updateDescription = async () => {
    await updateDoc(userRef, {
      Description: descriptionVal
    }).then(setShow(''));
  };



  return (
    <div className='DescriptionTab'>
      <div className='tabHeader'>
        <div className={toggleState === 0 ? "tabActive" : ""} onClick={() => toggleTab(0)}>Description</div>
        <div className={toggleState === 1 ? "tabActive" : ""} onClick={() => toggleTab(1)}>Specification</div>
      </div>
      <div className={toggleState === 1 ? "tabContent" : "tabHide"}>
       
        <div className='Description__product__info__features'>
          <div className='container'>
            <p className='call'>Condition:</p>
            <input type="text"
              className='response'
              placeholder='Condition'
              defaultValue={productDta?.Condition}
              onChange={(e) => {
                setCondition(e.target.value)
                setShow(0)
              }}  
            />
            <span className={`edit-sm ${show === 0 ? 'show' : ''}`}
              onClick={updateCondition}>
              <img src={pen} alt="" />
            </span>
            {/* <p className='response'>{productDta?.Condition}</p> */}
          </div>
          <div className='container' style={{position: 'relative'}}>
            <p className='call'> Available Colours:</p>
            <input type="text"
              className='response'
              placeholder='Available Colour'
              onChange={(e) => {
                // setColour(e.target.value)
                setShow(1)
              }}
              onKeyDown={handleKeyDown}
              onClick={
                ()=>{
                  showDrop(!drop);
                }
              }
              
            />

            <span className={`edit-sm ${show === 1 ? 'show' : ''}`}
              onClick={updateColour}>
              <img src={pen} alt="" />
            </span>
            <div className={`dropdown-list ${!drop ? 'hide' : 'show'}`} style={{top:"70px"}}>
            <ul>
            { colour.map((color, index) => (
              <li key={index}>
                {color}
                {/* <div className="tag-item" > */}
                    {/* <span className="text"></span> */}
                    <span className="close">&times;</span>
                {/* </div> */}
                </li>
            )) }
            </ul>
          </div>
            {/* <p className='response'>{productDta?.Colour}</p> */}
          </div>
          {

            <div className='container'>
              <p className='call'>Storage:</p>
              <input type="text"
                className='response'
                placeholder='Storage, if applicable'
                defaultValue={productDta?.DeviceStorage}
                onChange={(e) => {
                  setStorage(e.target.value)
                  setShow(2)
                }}
              />
              <span className={`edit-sm ${show === 2 ? 'show' : ''}`}
                onClick={updateStorage}>
                <img src={pen} alt="" />
              </span>
              {/* <p className='response'>{productDta?.DeviceStorage}</p> */}
            </div>
          }

          {
            productDta?.Category === "Mobile Devices" || "Laptops and Computers" ?

              <div className='container'>
                <p className='call'>RAM:</p>
                <input type="text"
                  className='response'
                  placeholder='RAM if applicable'
                  defaultValue={productDta?.Ram}
                  onChange={(e) => {
                    setRam(e.target.value)
                    setShow(4)
                  }}
                />
                <span className={`edit-sm ${show === 4 ? 'show' : ''}`}
                  onClick={updateRam}>
                  <img src={pen} alt="" />
                </span>
                {/* <p className='response'>{productDta?.Ram}</p> */}
              </div>
              :
              ''


          }

          {
            <div className='container'>
              <p className='call'>Battery:</p>
              <input type="text"
                className='response'
                placeholder='Battery, if applicable'
                defaultValue={productDta?.Battery}
                onChange={(e) => {
                  setBattery(e.target.value)
                  setShow(5)
                }}

              />
              <span className={`edit-sm ${show === 5 ? 'show' : ''}`}
                onClick={updateBattery}>
                <img src={pen} alt="" />
              </span>
              {/* <p className='response'>{productDta?.Battery}</p> */}
            </div>
          }

          {

            <div className='container'>
              <p className='call'>Processor:</p>
              <input type="text"
                className='response'
                placeholder='Processor, if applicable'
                defaultValue={productDta?.Processor}
                onChange={(e) => {
                  setProcessor(e.target.value)
                  setShow(6)
                }}
              />
              <span className={`edit-sm ${show === 6 ? 'show' : ''}`}
                onClick={updateProcessor}>
                <img src={pen} alt="" />
              </span>
              {/* <p className='response'>{productDta?.Processor}</p> */}
            </div>
          }

          {
            productDta?.Category === "Clothes & Shoes" ?

            <div className='container'>
              <p className='call'>Sizes:</p>
              <input type="text"
                className='response'
                placeholder='Sizes, if applicable'
                defaultValue={productDta?.Sizes}
                onChange={(e) => {
                  setSizes(e.target.value)
                  setShow(7)
                }}
              />
              <span className={`edit-sm ${show === 7 ? 'show' : ''}`}
                onClick={updateSizes}>
                <img src={pen} alt="" />
              </span>
              {/* <p className='response'>{productDta?.Sizes}</p> */}
            </div>
            :
            ""
          }
        </div>
      </div>
      {/* </div> */}
      <div className={toggleState === 0 ? "tabContent" : "tabHide"}>
        {
          <textarea name="" defaultValue={productDta?.Description}
            onChange={(e) => {
              setDescriptionVal(e.target.value)
              setShow(7)
            }}
            id="" style={{ width: '100%', height: "200px", border: "none", outline: 'none' }}
            placeholder='Enter item description'
          ></textarea>

        }
        <span className={`edit-sm ${show === 7 ? 'show' : ''}`}
          onClick={updateDescription}>
          <img src={pen} alt="" />
        </span>
      </div>

    </div>
  );
}

export default DescriptionEditTab;