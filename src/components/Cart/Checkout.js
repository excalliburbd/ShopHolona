import React from 'react';

import CheckoutDelivery from './CheckoutDelivery';
// import Stepper from '../Stepper';
// import Checkout from './Checkout';
// import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';


import './Checkout.css';

const Checkout = ({
    cartItems,
    total
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
  //     <Stepper steps={[
  //                {
  //                  icon: 'l',
  //                  text: 'le'
  //                }
  //              ]} />
  //   </div>
  // }

    return (
      <div className="checkout-container">
        {/* <div className="checkout-body">
          <div className="checkout-body--steps">}
            <div className="checkout-body--step">}
              <img src="http://lorempixel.com/400/200/transport" alt=""/>
              <p>Customer Verification</p>}
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
        </div> */}
        <CheckoutAddPhone />
      </div>

    )
}

export default Checkout;
