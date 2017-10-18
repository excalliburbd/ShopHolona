import React from 'react';

import Stepper from '../Stepper';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';
import CartTotal from './CartTotal';
import PaymentSelection from './CheckoutPaymentSelection';
import FinalizeOrder from './CheckoutFinalizeOrder';

import stepOne from '../../assets/images/stepper-icon-1.svg';
import stepTwo from '../../assets/images/stepper-icon-2.svg'
import stepThree from '../../assets/images/stepper-icon-3.svg'
import stepFour from '../../assets/images/stepper-icon-4.svg'

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
    handleShowCheckoutAddress,
  }) => {

  return (

    <div className={ `checkout-container ${ sidebarType === 'PHONE' ? 'checkout-background' : ''}` }>
      {
        sidebarType !== 'FINALIZE_ORDER' ?
        <Stepper  steps={[
                    {
                      icon: stepOne,
                      text: 'Customer Verification',
                      stepNo:0
                    },
                    {
                      icon: stepTwo,
                      text: 'Delivery Details',
                      stepNo:1
                    },
                    {
                      icon: stepThree,
                      text: 'Payment Method',
                      stepNo:2
                    },
                    {
                      icon: stepFour,
                      text: 'Finale',
                      stepNo:3
                    },

                  ]}
                  hide={ sidebarType === 'PHONE' }
                  step={ 0 } />
                  : null
      }

      <div className="checkout-main">
        {
          sidebarType === 'PHONE' && <CheckoutAddPhone handleShowCheckoutAddress={ handleShowCheckoutAddress }/>
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
        {
          sidebarType === 'PAYMENT_SELECTION' && <PaymentSelection />
        }
        {
          sidebarType === 'FINALIZE_ORDER' && <FinalizeOrder />
        }
      </div>
      {
        sidebarType !=='PHONE' && sidebarType !== 'FINALIZE_ORDER' && <div className="checkout-footer">
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
