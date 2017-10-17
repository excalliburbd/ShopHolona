import React from "react";
import Input from "react-toolbox/lib/input/Input";
import Button from "react-toolbox/lib/button/Button";

import UserPicExample from "../../assets/images/user-pic-example.svg";
import './CheckoutFinalizeOrder.css';

const FinalizeOrder = ({title}) => {
  return(
    <div>
      <div>{title}</div>
      <div className="Checkout-final">
        <p className="checkout-final-title">Order Finalized </p>
        <div className="order-finalized-container">
          <img className="user-profile-pic" src={UserPicExample}/>
          <div className="user-info-title-desc">
            <p className="user-name">Name: </p>
            <p className="user-name-value"> Saleka banu</p>
          </div>
          <div className="user-info-title-desc">
            <p className="user-phn-num">Phone: </p>
            <p className="user-phn-num-value"> 01231231231</p>
          </div>
          <div className="user-info-title-desc">
            <p className="user-email">E-mail: </p>
            <p className="user-email-value"> somethingsomething@something.com</p>
          </div>
          <div className="user-info-title-desc">
            <p className="user-adress">Address: </p>
            <p className="user-adress-value"> 119/1, CTA-9, Century Tower Complex, Bara
            Maghbazar, Dhaka, Bangladesh</p>
          </div>
          <div className="order-details">
            <p className="invoice-no">Invoice No:</p>
            <p className="invoice-no--value">2321312312321JK</p>
            <p className="cart-details">Cart Details</p>
            <i className="material-icons extra-details-icon">error_outline</i>
            <div className="total-amount">
              <p className="Total">Total:</p>
              <p className="total-value">31232TK</p>
            </div>
          </div>
          <p className="next-order-info">Don't work this hard the next time you order.</p>
          <p className="user-order-desc">Just add a password, secure your account details
           and ensure a faster checkout from the next time</p>          
          <Input type='password' label='Enter Your Password' name='password' />
          <Button className="sh-btn--yellow secure-acc-btn" label="Secure Account &amp; Shop More!"/>
        </div>
      </div>
    </div>
  )
}

export default FinalizeOrder;