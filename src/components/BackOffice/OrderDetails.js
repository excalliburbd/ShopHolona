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
  productList,
  getOrderStatus,
}) => {
  const newDate = new Date(date);
  return (
    <div className="sidebar-order-details-container">
      <p className="order-details-header">Invoice Details</p>
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
          <li>
            <strong className="status">Status: </strong>
            {
              status === 'Pending' ?

                <div className="order-details-btn">
                  <Button className="order-accept" label="Accept" raised onClick={ () => handleChangeOrderStatus(shop, token, id.substr(2), 2) } />
                  <Button className="order-cancel" label="Cancel" accent onClick={ () => handleChangeOrderStatus(shop, token, id.substr(2), 3) } />
                </div>
                :
                <div className="order-details-btn">
                  <p className="pay-status">{ status }</p>
                  {
                    status === 'Cancelled by Vendor' ? '' :
                    <Button className="order-cancel" label="Cancel" accent onClick={ () => handleChangeOrderStatus(shop, token, id.substr(2), 3) } />
                  }
                </div>
            }
          </li>
        </ul>
      </div>
      <div className="order-details-product-container">
        {
          productList.map(
            ({ product, variance, product_variance_attribute, price, weight, quantity, order_status}, index) => <div key={index} className="order-details-product">
              <div className="order-details-product-details" >
                <p>Proudct Name: </p>
                <p>{ product.name }</p>
              </div>
              <div className="order-details-product-details" >
                <p>{ variance.type.name }: </p>
                <p>{ variance.type.value }</p>
              </div>
              <div className="order-details-product-details" >
                <p>{ product_variance_attribute.type.name }: </p>
                <p>{ product_variance_attribute.type.value }</p>
              </div>
              <div className="order-details-product-details" >
                <p>Price: </p>
                <p>{ price }</p>
              </div>
              <div className="order-details-product-details" >
                <p>Weight: </p>
                <p>{ weight }</p>
              </div>
              <div className="order-details-product-details" >
                <p>Quantity: </p>
                <p>{ quantity }</p>
              </div>
              <div className="order-details-product-details" >
                <p>Status: </p>
                <p> { getOrderStatus(order_status) }</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default OrderDetails;
