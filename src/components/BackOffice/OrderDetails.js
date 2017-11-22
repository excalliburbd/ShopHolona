import React from 'react';
import './OrderDetails.css';

const OrderDetails = ({
  id,
  date,
  status,
  shPrice,
  price
}) => {
  const newDate = new Date(date);
  return (
    <div className="sidebar-order-details-container">
      <p className="order-details-header">Order Details</p>
      <div className="sidebar-order-details">
        <ul>
          <li>
            <strong>Invoice Number: </strong>
            { id }
          </li>
          <li>
            <strong>Date: </strong>
            <p>{ newDate.toDateString('YYYY-MM-DD') } </p>
          </li>
          <li>
            <strong>Status: </strong>
            { status }
          </li>
          <li>
            <strong>Delivery Fee: </strong>
            50 &#2547;
          </li>
          <li>
            <strong>SH Price(Payable by customer): </strong>
            { shPrice } &#2547;
          </li>
          <li>
            <strong>Price(Paid to you Shop Hobe): </strong>
            { price } &#2547;
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OrderDetails;
