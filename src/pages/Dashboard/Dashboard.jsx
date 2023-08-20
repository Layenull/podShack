import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../../components/Header/Header';
import StoreProduct from '../../components/Products/ProductByStore';
import InfoCard from '../../components/DashboardCard/InfoCard';
import { db } from '../../firebaseConfig';
import { getDoc, doc,  collection,  onSnapshot, } from "firebase/firestore";
import './dashboard.scss';
import { Link } from 'react-router-dom';
import StoreNotification from '../../components/notificationItems/storeNotification';


function Dashboard() {
    const { storeID } = useParams();
    const [storeData, setStoreData] = useState([]);
    const [storeOrders, setStoreOrders] = useState([])
    // const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                //console.log(currentUser?.uid);
                const docRef = doc(db, "shop", storeID);
                const docSnap = await getDoc(docRef);
                // console.log(auth.currentUser?.uid)

                if (docSnap.exists()) {
                    setStoreData(docSnap.data())
                    // console.log(docSnap.data())
                    //console.log("Document data:", docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            catch (err) {
                console.log(err);
            }
        };

        storeID && getData();

    }, [storeID]);

    //Get list of store orders 
    useEffect(() => {
        // setLoading(true)
        const unsub = onSnapshot(collection(db, 'shop', storeID, "orders"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            // setLoading(false)
            setStoreOrders(list)
            console.log(storeID);
        }, (err) => {
            console.log(err)
        })
        return () => {
            unsub();
        }

    }, [storeID]);

    return (
        <div className='Dashboard'>
            <Header />
            <div className=' Dashboard__main'>
                <div className='row'>
                    <div className='col-12 col-lg-4 grid-margin Dasshboard__main__left'>
                        <div className="card  text-dark dashboard-section">
                            <div className="card-body">
                                <h2 className="font-weight-normal mb-3 storeName">{storeData?.storeName}<i className="mdi mdi-chart-ane mdi-24px float-right"></i>
                                </h2>
                                <div className='dropdown-divider'></div>

                                <Link to={`/add-products/${storeID}`} className='dropdown-item'>
                                    Add new product
                                </Link>
                                <div className='dropdown-divider'></div>
                                <Link to='' className='dropdown-item'>
                                    Edit store info
                                </Link>
                                <div className='dropdown-divider'></div>
                                <div className='mt-5'>
                                    <h5 className='mb-3 card-title'>
                                        Store Notifications
                                    </h5>
                                    {/* <div className='dropdown-divider'></div>
                                    <Link to='' className='notifications dropdown-item'>
                                        Store notifications
                                    </Link>
                                    <div className='dropdown-divider'></div>
                                    <Link to='' className='notifications dropdown-item'>
                                        Store notifications
                                    </Link>
                                    <div className='dropdown-divider'></div>
                                    <Link to='' className='notifications dropdown-item'>
                                        Store notifications
                                    </Link> */}
                                    <StoreNotification/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-8 grid-margin'>
                        <div className="row">
                            <div className="col-md-4 stretch-card grid-margin">
                                <InfoCard cardTitle={'Total Orders'} cardValue={storeOrders.length} cardClass='bg-gradient-success' />
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <InfoCard cardTitle={'Total Deliveries'} cardValue={0} cardClass='bg-gradient-info' />
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <InfoCard cardTitle={'Pending Orders'} cardValue={0} cardClass='bg-gradient-danger' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card dashboard-section">
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">Orders</h4>
                                        <div className="table-responsive body-scroll">
                                            <table className="table ">
                                                <thead>
                                                    <tr>
                                                        <th> User </th>
                                                        <th> Product </th>
                                                        <th> Amount </th>
                                                        <th> Status </th>
                                                        <th> Tracking ID </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                storeOrders && storeOrders.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data?.user}</td>
                                        <td>{data?.product}</td>
                                        <td>{data?.amount}</td>
                                        <td>{data?.delivered == false ? "Pending" : "Delivered"} </td>
                                        <td>{data?.created.toDate().toString().slice(0, 21)} </td>
                                    </tr>
                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='product-grid row container-xl'>
                            <StoreProduct Admin />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;