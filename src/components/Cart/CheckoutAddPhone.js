import React from 'react';

import './CheckoutAddPhone.css';

import PhoneSignInSignUpContainer from '../../containers/PhoneSignInSignUpContainer';

const CheckoutAddPhone = ({
  handleShowCheckoutAddress,
}) => {
  return <div className="CheckoutAddPhone">
    <PhoneSignInSignUpContainer title="Checkout With Phone Number"
                                nextStep={ handleShowCheckoutAddress } />
  </div>
}

export default CheckoutAddPhone;
