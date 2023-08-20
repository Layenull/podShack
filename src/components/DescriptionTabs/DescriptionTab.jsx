import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc } from "firebase/firestore";
import './descriptionTab.scss'
import Dropdown from '../ReusableDropdown/Dropdown';

function DescriptionTab({colour, setColour, size, setSize}) {

  const [data, setData] = useState([]);
  const { id } = useParams();
  const [toggleState, setToggleState] = useState(0);
  const myColours = [] ;
  myColours.push(data?.Colour)
//  console.log(myColours);
  const sizeList =[]
  // sizeList.push(data?.size)
  const categoryList = []
  data?.Colour?.forEach((e)=>{
    categoryList.push(e)
  });

  data?.Sizes?.forEach((e)=>{
   sizeList.push(e)
  })
  const toggleTab = (index) => {
    setToggleState(index)
  }


  useEffect(() => {
    const getProductDesc = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setData(snapshot.data());
        }
        else {
          console.log("No such document!");
        }
        
      }
      
      catch (err) {
        console.log(err);
      };
    }
    id && getProductDesc();
  }, [id]);
  // console.log(data.Colour);

  return (
    <div className='DescriptionTab'>
      <div className='tabHeader'>
        <div className={toggleState === 0 ? "tabActive" : ""} onClick={() => toggleTab(0)}>Description</div>
        <div className={toggleState === 1 ? "tabActive" : ""} onClick={() => toggleTab(1)}>Specification</div>
      </div>
      <div className={toggleState === 0 ? "tabContent" : "tabHide"}>
       
        <div className='Description__product__info__features'>
          <div className='container'>
            <p className='call'>Condition:</p> <p className='response'>{data?.Condition}</p>
          </div>
          <div className='container'>
            <p className='call'> Available Colours:</p> 
            <Dropdown selectedCategory={colour} setSelectedCategory={setColour} categoryList={categoryList} placeHolder={"Select Colours"} />
            {/* <p className='response'>{data?.Colour}</p> */}
          </div>
          {
            data?.DeviceStorage === '' ?
              ''
              :
              <div className='container'>
                <p className='call'>Storage:</p> <p className='response'>{data?.DeviceStorage}</p>
              </div>
          }

          {
            data?.Ram === '' ?
              ''
              :
              <div className='container'>
                <p className='call'>Ram:</p> <p className='response'>{data?.Ram}</p>
              </div>
          }

{
            data?.Battery === '' ?
              ''
              :
              <div className='container'>
            <p className='call'>Battery:</p> <p className='response'>{data?.Battery}</p>
          </div>
          }

         {
          data?.Processor === '' ?
          ''
          :
           <div className='container'>
           <p className='call'>Processor:</p> <p className='response'>{data?.Processor}</p>
         </div>
         }

{
          data?.Category === "Clothes & Shoes" ?
          <div className='container'>
          <p className='call'>Sizes:</p> 
          <Dropdown selectedCategory={size} setSelectedCategory={setSize} categoryList={sizeList} placeHolder={"Select Size"} />
          {/* <p className='response'>{data?.Sizes}</p> */}
        </div>
          
          :
          ''
         }
        </div>
      </div>
      {/* </div> */}
      <div className={toggleState === 1 ? "tabContent" : "tabHide"}>
        {
          data.Description ?

            data.Description
            :
            'There is no available description for this product'
        }
      </div>

    </div>
  );
}

export default DescriptionTab;