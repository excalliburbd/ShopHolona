import React, { Component } from 'react';

import Stepper from '../Stepper';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';
import CartTotal from './CartTotal';
import PaymentSelection from './CheckoutPaymentSelection';
import FinalizeOrder from './CheckoutFinalizeOrder';

import stepTwo from '../../assets/images/stepper-icon-2.svg';
import stepThree from '../../assets/images/stepper-icon-3.svg';
import stepFour from '../../assets/images/stepper-icon-4.svg';

import Input from "react-toolbox/lib/input/Input";
import Button from "react-toolbox/lib/button/Button";

import './Checkout.css';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
    }
  }

  render() {
    const {
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
      handleShowFinalizeOrder,
      user,
      guestUser,
      handleCheckout,
      invoiceNumber,
      handleResetPassword,
    } = this.props;

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

    let activeUser = {
      name: 'loading',
      phone: 'loading',
      email: 'loading',
      address: 'loading',
    }

    if (user.token) {
      activeUser = {
        name: user.full_name,
        phone: user.phone,
        email: user.email,
        address: user.addresses[selectedAddress],
      }
    } else {
      activeUser = {
        name: guestUser.full_name,
        phone: guestUser.phone,
        email: guestUser.email,
        address: guestUser.addresses[selectedAddress],
      }
    }

    let passwordInput = null;

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
            sidebarType === 'FINALIZE_ORDER' && <FinalizeOrder name={ activeUser.name }
                                                              email={ activeUser.email }
                                                              phone={ activeUser.phone }
                                                              address={ activeUser.address }
                                                              cartTotal={ total }
                                                              invoiceNumber={ invoiceNumber }  />
          }
        </div>
        {
          sidebarType !=='PHONE' && <div className="checkout-footer">
            {
              sidebarType !== 'FINALIZE_ORDER' && <div>
                <div className="checkout-footer--info">
                  <p>Calculated Delivery Fee</p>
                  <p>৳</p>
                </div>
                <CartTotal total={ total }
                          cartItems={ cartItems }/>
              </div>
            }
            <div className="footer-btn-container">
              {
                sidebarType === 'ADDRESS' && <Button className="footer-next-btn sh-btn--yellow"
                                                    label="Next"
                                                    onClick={ () => {
                                                      if (selectedAddress !== null) {
                                                        handleShowPaymentMethods();
                                                      } else {
                                                        handleAddressAndShowNext(cityUIID, thanaUIID, title, details, addresses.length === 0, token || guestUser.token);
                                                      }
                                                    }} />
              }
              {
                sidebarType === 'PAYMENT_SELECTION' && <div className="footer-back-confirm-container">
                  <Button className="footer-back-btn" label="Back" onClick={ handleShowCheckoutAddress }/>
                  <Button className="footer-confirm-btn sh-btn--yellow" label="Confirm Order" onClick={ () => handleCheckout(total, cartItems, activeUser.address.id, token || guestUser.token, handleShowFinalizeOrder) }/>
                </div>
              }
              {
                sidebarType === 'FINALIZE_ORDER' && <div>
                  <p className="next-order-info">Don't work this hard the next time you order.</p>
                  <p className="user-order-desc">Just add a password, secure your account details
                  and ensure a faster checkout from the next time</p>
                  <Input type="password"
                        label="Enter Your Password"
                        name="password"
                        value={ this.state.password }
                        onChange={
                          value => {
                            this.setState({
                              password: value,
                            })
                          }
                        } />
                  <Button className="sh-btn--yellow secure-acc-btn"
                          label="Secure Account &amp; Shop More!"
                          onClick={
                            () => {
                              handleResetPassword(guestUser.password, this.state.password, guestUser.token, guestUser.phone);
                            }
                          }/>
                </div>
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Checkout;
