import React, { Component } from 'react';

import Stepper from '../Stepper';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutAddPhone from './CheckoutAddPhone';
import CartTotal from './CartTotal';
import PaymentSelection from './CheckoutPaymentSelection';
import FinalizeOrder from './CheckoutFinalizeOrder';
import DeliveryFee from './DeliveryFee';

import stepTwo from '../../assets/images/stepper-icon-2.svg';
import stepThree from '../../assets/images/stepper-icon-3.svg';
import stepFour from '../../assets/images/stepper-icon-4.svg';

import Input from "react-toolbox/lib/input/Input";
import Button from "react-toolbox/lib/button/Button";
import CartIcon from "../../assets/images/shopping-cart.svg";

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
      handleShowCart,
      handleShowPaymentMethods,
      handleShowFinalizeOrder,
      user,
      guestUser,
      handleCheckout,
      invoiceNumber,
      handleResetPassword,
      handleKeepShopping,
      additionalComments,
      updateAdditionalComments,
      handleDeleteAddress,
      shopName,
      addressTitle,
      addressDescription,
      addressCity,
      addressThana,
      addressDistrict,
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
      profile: 'https://backenddev.shophobe.com/media/Images/none/no_images.jpg'
    }

    if (user.token) {
      activeUser = {
        token: user.token,
        name: user.full_name,
        phone: user.phone,
        email: user.email,
        address: (user.addresses && `${selectedAddress}`) ? user.addresses[selectedAddress] : { details: null },
        profile: user.profile_pic,
      }
    } else {
      activeUser = {
        token: guestUser.token,
        name: guestUser.full_name,
        phone: guestUser.phone,
        email: guestUser.email,
        address: (guestUser.addresses && `${selectedAddress}`) ? guestUser.addresses[selectedAddress] : { details: null },
        profile: guestUser.profile_pic,
      }
    }

    return (
      <div className={ `checkout-container ${ sidebarType === 'PHONE' ? 'checkout-background' : ''}` }>
          {
            (sidebarType !== 'FINALIZE_ORDER' && sidebarType !== 'PHONE') && <div className="checkout-stepper">
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

            </div>
         }
        <div className={"checkout-main "+(sidebarType === 'PHONE'?'heightAuto':sidebarType === 'FINALIZE_ORDER'?token?'heightAuto':'checkout-scrollable':'overFlow')}>
          {
            sidebarType === 'PHONE' && <CheckoutAddPhone handleShowCheckoutAddress={ handleShowCheckoutAddress }/>
          }
          {
            sidebarType === 'ADDRESS' && <CheckoutDelivery  total={ total }
                                                            cartItems={ cartItems }
                                                            addresses={ addresses }
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
                                                            addressTitle={ addressTitle }
                                                            addressDescription={ addressDescription }
                                                            addressThana={ addressThana }
                                                            addressDistrict={ addressDistrict }
                                                            addressCity={ addressCity }
                                                            selectedAddress={ selectedAddress }
                                                            setSelectedAddress={ handleSetSelectedAddress }
                                                            additionalComments={ additionalComments }
                                                            updateAdditionalComments={ updateAdditionalComments }
                                                            deleteAddress={ id => handleDeleteAddress(id, activeUser.token, !user.token) }  />
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
                                                               additionalComments={ additionalComments }
                                                               invoiceNumber={ invoiceNumber }
                                                               cartItems={ cartItems }
                                                               profile={ activeUser.profile }
                                                               shopName={ shopName }  />
          }
        </div>
        {// footer
          sidebarType !=='PHONE' && <div className="checkout-footer">
            {
              sidebarType !== 'FINALIZE_ORDER' && <div className="cart-order-calculation">
                {
                  (selectedAddress !== null || (addressCity && addressDistrict && addressThana))?
                    <DeliveryFee total={total}/>
                    :null
                }
                <CartTotal total={ total }
                          cartItems={ cartItems }/>
              </div>
            }
            <div className="footer-btn-container">
              {
                sidebarType === 'ADDRESS' && <div className="footer-back-confirm-container">
                  <button className="cart-back-btn"  onClick={ handleShowCart }>
                  <p>CART</p>
                  <img src={CartIcon} alt=""/></button>
                  <Button className="footer-next-btn sh-btn--yellow"
                                                      label="Next"
                                                      onClick={ () => {
                                                        if (selectedAddress !== null) {
                                                          handleShowPaymentMethods();
                                                        } else {
                                                          handleAddressAndShowNext(cityUIID, thanaUIID, title, details, addresses, token || guestUser.token, !user.token);
                                                        }
                                                      }} />
                </div>
              }
              {
                sidebarType === 'PAYMENT_SELECTION' && <div className="footer-back-confirm-container">
                  <Button className="footer-back-btn" label="Back" onClick={ handleShowCheckoutAddress }/>
                  <Button className="footer-confirm-btn sh-btn--yellow"
                          label="Confirm Order"
                          onClick={
                            () => handleCheckout(total, cartItems, activeUser.address.id, additionalComments, activeUser.token, handleShowFinalizeOrder)
                          } />
                </div>
              }
              {
                ( sidebarType === 'FINALIZE_ORDER' && !token) && <div>
                  <div className="last-step-footer">
                    <p className="next-order-info">Don't work this hard the next time you order.</p>
                    <Input className="secure-acc-password"
                          type="password"
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
                            } />
                  </div>
                </div>
              }
              {
                ( sidebarType === 'FINALIZE_ORDER' && token) &&
                <div className="non-reg-user-footer">
                    <p>We will notify you when '{ shopName }' confirms the order. In the meantime...</p>
                    <Button className="sh-btn--yellow secure-acc-btn"
                          label="Shop More!"
                          onClick={
                            handleKeepShopping
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
