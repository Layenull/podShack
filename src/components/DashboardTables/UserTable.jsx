import React from 'react';
import { useUserInfo } from '../../config/contexts/AdminContext';

function UserTable() {
    const {users} = useUserInfo();

    return (
        <div className="card dashboard-section">
            <div className="card-body">
                <h4 className="card-title mb-4">List of users</h4>
                <div className="table-responsive body-scroll">
                    
                            <table className="table " >
                                <thead>
                               
                                    <tr >
                                        <th> User </th>
                                        <th> Orders </th>
                                        <th> Status </th>
                                        <th>  Email </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                        users && users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{`${user?.firstName} ${user?.lastName}`} </td>
                                        <td> 0 </td>
                                        <td>{user?.isSeller ? user.isSeller = true ?'Seller': 'Regular' 
                                        
                                        : 'Regular'}</td>
                                        <td>{user?.email} </td>

                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                     
                </div>
            </div>
        </div>
    );
}

export default UserTable;