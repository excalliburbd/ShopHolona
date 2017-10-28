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
      <div className="payment-option--payment-method Checkout-toggled enabled">
        <img src={deliveryOne} alt=""/>
        <div className="payment-method-desc">
          <p>Cash on Delivery</p>
          <p>Pay with cash for ultimate convenience when the product is delivered to you.</p>
        </div>
      </div>
      <div className="payment-option--payment-method disabled" title="Coming Soon">
        <img src={deliveryTwo} alt=""/>
        <div className="payment-method-desc">
        <p>Credit Card Payment</p>
        <p>Pay online through your credit card (VISA, MasterCard) for a safe and secure transaction. </p>
      </div>
      </div>
      <div className="payment-option--payment-method disabled" title="Coming Soon">
        <img src={deliveryThree} alt=""/>
        <div className="payment-method-desc">
        <p>Mobile Banking</p>
        <p>Pay from all across Bangladesh with all options of mobile banking available for you
        (nominal fees will be charged).</p>
      </div>
      </div>
      <div className="payment-option--payment-method disabled" title="Coming Soon">
        <img src={deliveryFour} alt=""/>
        <div className="payment-method-desc">
        <p>SH Coins</p>
        <p>Pay with your own exclusive SH Coins (coming soon).</p>
      </div>
      </div>
    </div>
  )
}

export default PaymentSelection;
