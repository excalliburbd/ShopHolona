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
