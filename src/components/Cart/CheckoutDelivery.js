import React from 'react'

import Button from 'react-toolbox/lib/button/Button';

import CartTotal from './CartTotal'

import './CheckoutDelivery.css'

const CheckoutDelivery = ({
    cartItems,
    total
  }) => {
    return (
      <div className="checkout-delivery">
        <div className="checkout-delivery-body">
          <h2 className="checkout-delivery-title">Delivery Address Details</h2>
          <Button className="checkout-delivery-address--btn-add" icon='add' label='Bookmark' raised />
          <div className="checkout-delivery-address--view">
            <div className="checkout-delivery-address--card">
              <div className="checkout-delivery-address--card-title">Home</div>
              <div className="checkout-delivery-address--card-content">1/9, Block-B, Lalmatia, Dhaka-1207</div>
            </div>
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
