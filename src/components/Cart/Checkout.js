import React from 'react'

import CheckoutDelivery from './CheckoutDelivery'

import './Checkout.css'

const Checkout = ({
    address = 'im an address',
    cartItems,
    total
  }) => {

    return (
      <div className="checkout-container">
        <div className="checkout-body">
          <div className="checkout-body--steps">
            <div className="checkout-body--step">
              <img src="http://lorempixel.com/400/200/transport" alt=""/>
              <p>Customer Verification</p>
            </div>
            <div className="checkout-body--step">
              <img src="http://lorempixel.com/400/200/transport" alt=""/>
              <p>Delivery Details</p>
            </div>
            <div className="checkout-body--step">
              <img src="http://lorempixel.com/400/200/transport" alt=""/>
              <p>Payment Method</p>
            </div>
            <div className="checkout-body--step">
              <img src="http://lorempixel.com/400/200/transport" alt=""/>
              <p>Finale</p>
            </div>
          </div>
          <div className="checkout-stepper">
            <CheckoutDelivery total={ total }
                              cartItems={ cartItems } />
          </div>
        </div>
      </div>

    )
}

export default Checkout;
