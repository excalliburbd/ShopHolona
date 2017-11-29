import React from 'react';

import './OrderDetails.css';

import Button from 'react-toolbox/lib/button/Button';

const OrderDetails = ({
  id,
  date,
  status,
  shPrice,
  price,
  handleChangeOrderStatus,
  shop,
  token,
}) => {
  const newDate = new Date(date);

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
                <Button label="Accept" raised onClick={ () => handleChangeOrderStatus(shop, token, id.substr(2), 2) } />
                :
                <span>
                  <p>{ status }</p>
                  {
                    status === 'Cancelled by Vendor' ? '' :
                    <Button label="Cancel" accent onClick={ () => handleChangeOrderStatus(shop, token, id.substr(2), 3) } />
                  }
                </span>
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
      </div>
    </div>
  )
}

export default OrderDetails;
