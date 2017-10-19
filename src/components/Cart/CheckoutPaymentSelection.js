import React from 'react';

import './CheckoutPaymentSelection.css';

import deliveryOne from '../../assets/images/Payment-1.svg';
import deliveryTwo from '../../assets/images/Payment-2.svg';
import deliveryThree from '../../assets/images/Payment-3.png';
import deliveryFour from '../../assets/images/Payment-4.png';

const PaymentSelection = ({title}) => {
  return(
    <div className="payment-option-container">
      <div className="payment-tittle">Choose Your Preferred Payment Method</div>
      <div className="payment-option--payment-method Checkout-toggled">
        <img src={deliveryOne} alt=""/>
        <div className="payment-method-desc">
          <p>Cash on Delivery</p>
          <p>Seceure, cash on delivery to our delivery partner.</p>
        </div>
      </div>
      <div className="payment-option--payment-method">
        <img src={deliveryTwo} alt=""/>
        <div className="payment-method-desc">
        <p>Credit Card Payment</p>
        <p>All forms fof credit cards are accepted(VISA, MasterCard)</p>
      </div>
      </div>
      <div className="payment-option--payment-method">
        <img src={deliveryThree} alt=""/>
        <div className="payment-method-desc">
        <p>bKash Payment</p>
        <p>bKash Payment is also accepted. Nominal fees will be charged.</p>
      </div>
      </div>
      <div className="payment-option--payment-method">
        <img src={deliveryFour} alt=""/>
        <div className="payment-method-desc">
        <p>SH Coins</p>
        <p>No hidden fee charged. Do it the SH way</p>
      </div>
      </div>
    </div>
  )
}

export default PaymentSelection;
