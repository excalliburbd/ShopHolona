import React from 'react';

const Checkout_old = ({
                    cartItems,
                    total,
                    handleCheckout,
                    token,
                    address,
                    handleAddress,
                  }) => {

  return (
    <div>in checkout</div>
  )
}

export default Checkout;

import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

// import './Checkout.css';

const Checkout = ({
  cartItems,
  total,
  handleCheckout,
  token,
  address,
  handleAddress,
}) => {

  return (
    <div className="checkout">
      <ul>
        <li>Total Price: &#2547; { total.price }</li>
        <li>Total Weight: { total.weight } g</li>
      </ul>
      <Input type="text"
             label="To Address"
             value={ address }
             onChange={ handleAddress }/>

      <div className="checkout--actions">
        <Button label="Place Order"
                accent
                raised
                onClick={ () => handleCheckout(total, cartItems, address, token) } />
      </div>
    </div>
  )
}

export default Checkout_old;
