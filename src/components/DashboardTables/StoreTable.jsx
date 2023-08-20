import React from 'react';
import { useUserInfo } from '../../config/contexts/AdminContext';

function StoreTable() {
    const { stores } = useUserInfo();

    return (
        <div className="card dashboard-section">
            <div className="card-body">
                <h4 className="card-title mb-4">List of Stores</h4>
                <div className="table-responsive body-scroll">

                    <table className="table " >
                        <thead>

                            <tr >
                                <th> Store Name </th>
                                <th>Verified</th>
                                <th> Identification </th>
                                <th>Business Contact</th>
                                <th>  Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stores && stores.map((store, index) => (
                                    <tr key={index}>
                                        <td>{store?.storeName}</td>
                                        <td>{store?.Visible && store?.Visible === true ? "True" : "False"}</td>
                                        <td>{store?.idDocument ? <a href={store?.idDocument}>View</a> : "null"}</td>
                                        <td>{store?.bizContact} </td>
                                        <td>{store?.Visible && store?.Visible === true ?
                                       <button className='btn btn-sm btn-danger'>un-verify</button>
                                        : <button className='btn btn-sm btn-success'>verify</button>}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default StoreTable;