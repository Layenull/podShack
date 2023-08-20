import React from 'react';
import Header from '../../components/Header/Header';
import InfoCard from '../../components/DashboardCard/InfoCard';
import './dashboard.scss';
import { Link } from 'react-router-dom';
import UserTable from '../../components/DashboardTables/UserTable';
import { useUserInfo } from '../../config/contexts/AdminContext';
import StoreTable from '../../components/DashboardTables/StoreTable';
import OrderTable from '../../components/DashboardTables/OrderTable';


function SuperAdmin() {
    const {users, orders, delivered} = useUserInfo()
    
    return (
        <div className='Dashboard'>
            <Header />
            <div className=' Dashboard__main'>
                <div className='row'>
                    <div className='col-12 col-lg-4 grid-margin Dasshboard__main__left'>
                        <div className="card  text-dark dashboard-section">
                            <div className="card-body">
                                <h2 className="font-weight-normal mb-3 storeName">ADMIN
                                </h2>
                                <div className='dropdown-divider'></div>
                                
                                <Link to='' className='dropdown-item'>
                                    Notification Broadcast
                                </Link>
                                <div className='dropdown-divider'></div>
                                <div className='mt-5'>
                                    <h5 className='mb-3 card-title'>
                                        User Complaints
                                    </h5>
                                    <div className='dropdown-divider'></div>
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
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-8 grid-margin'>
                        <div className="row">
                        <div className="col-md-4 stretch-card grid-margin">
                                <InfoCard cardTitle={'Users'} cardValue={users.length} cardClass='bg-gradient-danger' />
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <InfoCard cardTitle={'Total Orders'} cardValue={orders.length} cardClass='bg-gradient-success' />
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <InfoCard cardTitle={'Total Deliveries'} cardValue={delivered.length} cardClass='bg-gradient-info' />
                            </div>    
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <StoreTable/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                              <UserTable/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                              <OrderTable/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SuperAdmin;