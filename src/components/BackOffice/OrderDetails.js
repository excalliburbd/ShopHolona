import React from 'react';

const OrderDetails = ({
  id,
  date,
  status,
  shPrice,
  price
}) => {
  return (
    <ul>
      <li>
        <strong>Invoice Number: </strong>
        { id }
      </li>
      <li>
        <strong>Date: </strong>
        { date }
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
  )
}

export default OrderDetails;
