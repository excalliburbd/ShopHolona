import React from 'react';

import Stepper from '../Stepper';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';
import CartTotal from './CartTotal';


import './Checkout.css';

const Checkout = ({
    cartItems,
    total,
    sidebarType,
    token,
    addresses,
    districts,
    districtUIValue,
    cities,
    cityUIValue,
    cityUIID,
    thanas,
    thanaUIValue,
    thanaUIID,
    handleSetValue,
    handleSelect,
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
                                                          token={ token }
                                                          districts={ districts }
                                                          districtUIValue={ districtUIValue }
                                                          cities={ cities }
                                                          cityUIValue={ cityUIValue }
                                                          cityUIID={ cityUIID }
                                                          thanas={ thanas }
                                                          thanaUIValue={ thanaUIValue }
                                                          thanaUIID={thanaUIID }
                                                          handleSetValue={ handleSetValue }
                                                          handleSelect={ handleSelect } />
        }
      </div>
      {
        sidebarType !=='PHONE' && <div className="checkout-footer">
          <div className="checkout-footer--info">
            <p>Calculated Delivery Fee</p>
          </div>
          <CartTotal total={ total }
                     cartItems={ cartItems }/>
        </div>
      }
    </div>
  )
}

export default Checkout;
