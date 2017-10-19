import React from 'react';

import Stepper from '../Stepper';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';
import CartTotal from './CartTotal';
import PaymentSelection from './CheckoutPaymentSelection';
import FinalizeOrder from './CheckoutFinalizeOrder';

import stepTwo from '../../assets/images/stepper-icon-2.svg'
import stepThree from '../../assets/images/stepper-icon-3.svg'
import stepFour from '../../assets/images/stepper-icon-4.svg'

import Button from 'react-toolbox/lib/button/Button';

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
    handleAddressAndShowNext,
    details,
    title,
    selectedAddress,
    handleSetSelectedAddress,
    handleShowPaymentMethods,
  }) => {

  const getStep = type => {
    switch (type) {
      case 'ADDRESS':
        return 0;
      case 'PAYMENT_SELECTION':
        return 1;
      case 'FINALIZE_ORDER':
        return 2;
      default:
        return null;
    }
  }

  return (

    <div className={ `checkout-container ${ sidebarType === 'PHONE' ? 'checkout-background' : ''}` }>
      {
        sidebarType !== 'FINALIZE_ORDER' ?
          <Stepper  steps={[
                      {
                        icon: stepTwo,
                        text: 'Delivery Details',
                        stepNo:0
                      },
                      {
                        icon: stepThree,
                        text: 'Payment Method',
                        stepNo:1
                      },
                      {
                        icon: stepFour,
                        text: 'Finale',
                        stepNo:2
                      },

                    ]}
                    hide={ sidebarType === 'PHONE' }
                    step={
                      getStep(sidebarType)
                    }
                    handleClick={ () => null }  />
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
                                                          handleSelect={ handleSelect }
                                                          handleAddressAndShowNext={ handleAddressAndShowNext }
                                                          details={ details }
                                                          title={ title }
                                                          selectedAddress={ selectedAddress }
                                                          setSelectedAddress={ handleSetSelectedAddress }/>
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
            <p>৳</p>
          </div>
          <CartTotal total={ total }
                     cartItems={ cartItems }/>
          <div className="footer-btn-container">
            {
              sidebarType === 'ADDRESS' && <Button className="footer-next-btn sh-btn--yellow"
                                                   label="Next"
                                                   onClick={ () => {
                                                     if (selectedAddress !== null) {
                                                      handleShowPaymentMethods()
                                                     } else {
                                                      handleAddressAndShowNext(cityUIID, thanaUIID, title, details, addresses.length === 0, token)
                                                     }
                                                   }} />
            }
            {
              sidebarType === 'PAYMENT_SELECTION' && <div className="footer-back-confirm-container">
                <Button className="footer-back-btn" label="Back"/>
                <Button className="footer-confirm-btn sh-btn--yellow" label="Confirm Order"/>
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Checkout;
