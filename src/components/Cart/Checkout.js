import React from 'react';

import Button from 'react-toolbox/lib/button/Button';
import express from '../../assets/images/express-delivery-icon.svg'
import standard from '../../assets/images/standard-delivery-icon.svg'
// import CheckoutDelivery from './CheckoutDelivery';
import Stepper from '../Stepper';
// import Checkout from './Checkout';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';


import './Checkout.css';

const Checkout = ({
    cartItems,
    total,
    sidebarType,
    token,
    addresses,
  }) => {

  return (
    <div className={ `checkout-container ${ sidebarType === 'PHONE' ? 'checkout-background' : null}` }>
      <Stepper  steps={[
                  {
                    icon: 'http://lorempixel.com/400/200/transport',
                    text: 'le'
                  },
                  {
                    icon: 'http://lorempixel.com/400/200/transport',
                    text: 'lelelel'
                  }
                ]}
                hide={ sidebarType === 'PHONE' }  />
      <div className="checkout-main">
        {
          sidebarType === 'PHONE' && <CheckoutAddPhone />
        }
        {
          sidebarType === 'ADDRESS' && <CheckoutDelivery  total={ total }
                                                          cartItems={ cartItems }
                                                          addresses={ addresses }
                                                          handleCheckout={ () => null }
                                                          token={ token }  />
        }
        <div>
          <div className="checkout--btn-title-container">
            <p className="checkout--delivery-title">Choose Your Delivery Option</p>
            <div className="checkout--btn-container">
              <Button className="checkout--exprs-btn" ><img alt =""src={express}/>Express</Button>             
              <Button className="checkout--std-btn sh-btn--yellow"><img alt="" src={standard}/>Standard</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;
