import React from 'react';

// import CheckoutDelivery from './CheckoutDelivery';
import Stepper from '../Stepper';
// import Checkout from './Checkout';
// import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';


import './Checkout.css';

const Checkout = ({
    cartItems,
    total,
    sidebarType
  }) => {

  // if (sidebarType === 'CHECKOUT_ADDRESS') {
  //   return <CheckoutDelivery total={ total }
  //                            cartItems={ cartItems }
  //                            addresses={ addresses }
  //                            handleCheckout={ handleCheckout }
  //                            token={ token } />
  // }

  // if (sidebarType === 'CHECKOUT_PHONE') {
  //   return <CheckoutAddPhone />
  // }

  // if (sidebarType === 'CHECKOUT_VERIFY_PHONE') {
  //   return <div>
  //
  //   </div>
  // }

  return (
    <div className="checkout-container">
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
      {
        sidebarType === 'PHONE' && <CheckoutAddPhone />
      }
    </div>
  )
}

export default Checkout;
