import React from "react";
import { useUserInfo } from "../../config/contexts/AdminContext";

function StoreOrderTable() {
  const { orders } = useUserInfo();

  return (
    <div className="card dashboard-section">
      <div className="card-body">
        <h4 className="card-title mb-4">List of Orders</h4>
        <div className="table-responsive body-scroll">
          <table className="table ">
            <thead>
              <tr>
                <th> User </th>
                <th> Store Name </th>
                <th> Product </th>
                <th> Amount </th>
                <th> Date </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((data, index) => (
                  <tr key={index}>
                    <td>{data.user}</td>
                    <td>{data.store}</td>
                    <td>{data.product}</td>
                    <td>{data.amount}</td>
                    <td className="date">{data.created.toDate().toString().slice(0, 21)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StoreOrderTable;
