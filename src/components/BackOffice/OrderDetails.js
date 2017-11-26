import React from 'react';
import './OrderDetails.css';

import Dropdown from 'react-toolbox/lib/dropdown';

const OrderDetails = ({
  id,
  date,
  status,
  shPrice,
  price
}) => {
  const newDate = new Date(date);
  const statusList = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
  ];
  return (
    <div className="sidebar-order-details-container">
      <p className="order-details-header">Order Details</p>
      <div className="sidebar-order-details">
        <ul>
          <li>
            <strong>Invoice Number: </strong>
            {id}
          </li>
          <li>
            <strong>Date: </strong>
            <p>{newDate.toDateString('YYYY-MM-DD')} </p>
          </li>
          <li>
            <strong>Status: </strong>
            {
              status === 'Pending' ?
                <Dropdown
                  auto={false}
                  source={statusList}
                  onChange={(val)=>{console.log(val)}}
                  value={status.replace(/ /g,'')} />
                :
                status
            }
          </li>
          <li>
            <strong>Delivery Fee: </strong>
            50 &#2547;
          </li>
          <li>
            <strong>SH Price(Payable by customer): </strong>
            {shPrice} &#2547;
          </li>
          <li>
            <strong>Price(Paid to you Shop Hobe): </strong>
            {price} &#2547;
          </li>
        </ul>
        {/* <Dropdown
              auto={false}
              source={statusList}
              onChange={(val)=>{console.log(val)}}
              value={status.replace(/ /g,'')} /> */}
      </div>
    </div>
  )
}

export default OrderDetails;
