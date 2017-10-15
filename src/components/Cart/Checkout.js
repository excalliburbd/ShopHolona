import React from 'react';

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
      </div>
    </div>
  )
}

export default Checkout;
