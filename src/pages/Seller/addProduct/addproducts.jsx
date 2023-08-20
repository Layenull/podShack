import React, {useState} from 'react';
import Header from '../../../components/Header/Header';
import FootBar from "../../../components/FootBar/FootBar";
// import location from '../../../props/Icons/location.svg';
import shop from '../../../props/Icons/building-4.svg';
import Category from '../../../props/Icons/Category.svg';
import CategoryDrop from '../CategoryDrop';
//import addImage from "../../../props/Icons/Add_square.svg";
import { doc, setDoc, collection, serverTimestamp  } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import { useParams, useNavigate } from 'react-router';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useEffect } from 'react';
import '../seller.scss';
import TagsInput from '../../../components/TagInput/TagInput';


function AddProducts() {
  const { storeID } = useParams();
  const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(Number);
    const [price, setPrice] = useState(Number);
    const [condition, setCondition] = useState('');
    const [ram, setRam] = useState('');
    const [colour, setColour] = useState([]);
    const [storage, setStorage] = useState('');
    const [processor, setProcessor] = useState('');
    const [battery, setBattery] = useState('');
    const [sizes, setSizes] = useState([]);

      const handleUpload = async () => {
        const docRef = doc(collection(db, 'products'));
        sessionStorage.setItem('productID', docRef.id)
        const productID = docRef.id
        await setDoc(docRef, {
          Name: productName,
          Category: category,
          Store: storeID,
          Price: price,
          Created: serverTimestamp(),
          Description: description,
          Quantity: quantity, 
          Available: true,
          Condition: condition,
          Colour: colour,
          RAM: ram,
          DeviceStorage: storage, 
          Processor: processor,
          Battery: battery,
          Sizes: sizes

          // Images:imgObj
          
        })
        
        .then(navigate(`/add-images/${storeID}/${productID}`));
      }

    return (
        <div className='AddProducts'>
            <Header/>
            <div className='AddProducts__main'>
                <div className='AddProducts__main__top'>
                <h2>Add Products or Food Item</h2>
                <p>Please fill out this form to add an item</p>
                </div>
        
            <div className='AddProducts__main__form'>
         
            <div className='AddProducts__main__form__input'>
                    <div className='icon-div'><img src={shop} alt="" /></div>
                    <input type="text" placeholder='Item Name' required  onChange={(e)=>{ setProductName(e.target.value) }}/>
                </div>

                <CategoryDrop selectedCategory={category} setSelectedCategory={setCategory} />

                {/* <div className='AddProducts__main__form__input'>
                <div className='icon-div'><img src={Category} alt="" /></div> */}
                    {/* <input type="text" placeholder='Colour' required  onChange={(e)=>{ setColour(e.target.value) }}/> */}
                    
                {/* </div> */}
                
                <div className={category === 'Clothes & Shoes' ? 'showInput' : 'hideInput' }>
                {/* <div className='AddProducts__main__form__input'>
                <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="text" placeholder='Sizes' required  onChange={(e)=>{ setSizes(e.target.value) }}/>
                </div> */}
                <TagsInput placeHolder={"Sizes e.g. XS, L, XXL... etc  or in number e.g 32, 40 etc, where applicable "} tags={sizes} setTags={setSizes}  />
                </div>

                <div className={category === 'Mobile Devices' || category === 'Laptops and Computers' ? 'showInput' : 'hideInput' }>
                <div className='AddProducts__main__form__input'>
                <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="text" placeholder='Battery Life' required  onChange={(e)=>{ setBattery(e.target.value) }}/>
                </div>

                <div className='AddProducts__main__form__input'>
                <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="text" placeholder='Storage Capacity' required  onChange={(e)=>{ setStorage(e.target.value) }}/>
                </div>

                <div className='AddProducts__main__form__input'>
                <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="text" placeholder='RAM' required  onChange={(e)=>{ setRam(e.target.value) }}/>
                </div>

                <div className='AddProducts__main__form__input'>
                <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="text" placeholder='Processor' required  onChange={(e)=>{ setProcessor(e.target.value) }}/>
                </div>
                </div>
                
                <div className='AddProducts__main__form__input'>
                    <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="Number" placeholder='Price' required  onChange={(e)=>{setPrice(e.target.value)}}/>
                </div>
                <div className='AddProducts__main__form__input'>
                    <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="Number" placeholder='Quantity available' required  onChange={(e)=>{setQuantity(e.target.value)}}/>
                </div>
                {/* <div className='AddProducts__main__form__input'>
                    <div className='icon-div'><img src={Category} alt="" /></div>
                    <input type="text" placeholder='Condition ' required  onChange={(e)=>{setCondition(e.target.value)}}/>
                </div> */}

                {/* <TagsInput placeHolder={"Colours: Click enter to add"} tags={colour} setTags={setColour}  /> */}

                {/* <div className='AddProducts__main__form__input'> */}
                    {/* <div className='icon-div'><img src={Category} alt="" /></div> */}
                    <textarea type="text" placeholder='Please enter an extensive description of your food or product  ' required  onChange={(e)=>{setDescription(e.target.value)}}  style={{width: '100%'}}/>
                {/* </div> */}
              
                <button className='AddProducts__main__form__Btn' onClick={() => {
                    // navigate('/auth-contact')
                    handleUpload()
                }}>Submit</button>
            </div>
            </div>
            <FootBar/>
        </div>
    );
}

export default AddProducts;