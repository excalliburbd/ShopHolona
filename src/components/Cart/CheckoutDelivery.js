import React from 'react'

import Button from 'react-toolbox/lib/button/Button';

import CartTotal from './CartTotal'

import './CheckoutDelivery.css'

const CheckoutDelivery = ({
  cartItems,
  total
}) => {
  const addresses = [
    {
      id: 1,
      title: "Home",
      details: "1/9, Block-B, Lalmatia, Dhaka-1207"
    },
    {
      id: 2,
      title: "Office",
      details: "lamatia, dhaka"
    }
  ]
  return (
      <div className="checkout-delivery">
        <div className="checkout-delivery-body">
          <h2 className="checkout-delivery-title">Delivery Address Details</h2>
          <Button className="checkout-delivery-address--btn-add" icon='add' label='Bookmark' raised />
          <div className="checkout-delivery-address--view">
            {
              Array.isArray(addresses) && addresses.map((address) => {
                return (
                  <div className="checkout-delivery-address--card" key={address.id}>
                    <div className="checkout-delivery-address--card-title">{address.title}</div>
                    <div className="checkout-delivery-address--card-content">{address.details}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="checkout-footer">
          <div className="checkout-footer--info">
            <p>Calculated Delivery Fee</p>
          </div>
          <CartTotal total={ total }
                     cartItems={ cartItems }/>
          <Button label="Next"
                  raised
                  className="checkout-footer--btn sh-btn--yellow"/>
        </div>
      </div>

    )
}

export default CheckoutDelivery
