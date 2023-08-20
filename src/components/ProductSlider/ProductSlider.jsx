import React, { useEffect, useState } from 'react';
import './productslider.scss';
// import ipod from '../../props/Images/ipodWhite.png';
// import ipod2 from '../../props/Images/ipod 2.jpg';
// import ipod3 from '../../props/Images/ipod3.PNG';
// import ipod4 from '../../props/Images/ipod1.PNG';
import { useParams } from 'react-router';
import { db } from '../../firebaseConfig';
import { getDoc, doc } from "firebase/firestore";
//import Spinner from '../Spinner/Spinner';

function ProductSlider() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const list = []
            try {
                //setLoading(true)
                // console.log(currentUser?.uid);
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                // console.log(auth.currentUser?.uid)

                if (docSnap.exists()) {
                    setData(docSnap.data())
                    console.log("Document data:", docSnap.data());
                    setLoading(false);
                    list.push(data.Images)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    setLoading(true)
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        getData()
    }, [id])
    //console.log(data);

    return (
        <div className='Productslicesr'>
            <section>
                <div className="containe">
                    <div className="carosels imageLayout">
                        <input type="radio" name="slicess" id="slices-1" />
                        <input type="radio" name="slicess" id="slices-2" />
                        <input type="radio" name="slicess" id="slices-3" />
                        <input type="radio" name="slicess" id="slices-4" />
                        <input type="radio" name="slicess" id="slices-5" />
                        <input type="radio" name="slicess" id="slices-6" />
                        {/* <div className='imageLayout'> */}
                        <ul className="carosels__slicess">
                            <li className="carosels__slices">
                                <figure>
                                    <div>
                                        {
                                            !loading ?
                                                <img src={data.CoverImg?.img0} alt="" />
                                                :
                                                'Loading....'
                                                // <Spinner/>
                                        }
                                    </div>
                                </figure>
                            </li>
                            <li className="carosels__slices">
                                <figure>
                                    <div>
                                        <img src={data.CoverImg?.img1} alt="" />
                                    </div>
                                </figure>
                            </li>
                            <li className="carosels__slices">
                                <figure>
                                    <div>
                                        {/* <img src="https://picsum.photos/id/1044/800/450" alt=""/> */}
                                        <img src={data.Images?.img0} alt="" />
                                    </div>
                                </figure>
                            </li>
                            <li className="carosels__slices">
                                <figure>
                                    <div>
                                        <img src={data.Images?.img1} alt="" />
                                    </div>
                                    {/* <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span className="credit">Photo: Aleksandra Boguslawska</span>                            
                        </figcaption> */}
                                </figure>
                            </li>
                 
                        </ul>
                        <ul className="carosels__thumbnails">
                            {
                                data.CoverImg?.img0 ?
                                    <li>
                                        <label for="slices-1">
                                            <img src={data.CoverImg?.img0} alt="" />
                                        </label>
                                    </li>
                                    :
                                    <></>
                            }
                            {
                                data.CoverImg?.img1 ?
                                    <li>
                                        <label for="slices-2">
                                            <img src={data.CoverImg?.img1} alt="" />
                                        </label>
                                    </li>
                                    :
                                    <></>
                            }
                            {
                                data.Images?.img0 ?
                                    <li>
                                        <label for="slices-3">
                                            <img src={data.Images?.img0} alt="" />
                                        </label>
                                    </li>
                                    :
                                    <></>
                            }
                            {
                                data.Images?.img1 ?
                                    <li>
                                        <label for="slices-4">
                                            <img src={data.Images?.img1} alt="" />
                                        </label>
                                    </li>
                                    :
                                    <></>
                            }
                        </ul>
                        {/* </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductSlider;