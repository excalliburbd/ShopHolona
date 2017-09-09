import React from 'react';

import './CartTotal.css'

const CartTotal = ({
    cartItems,
    total,
  }) => {
  return (
    <div className="cart-header">
      <div className="cart-header-text">
        <h4>{ cartItems.length } items</h4>
      </div>
      <div className="cart-header-total">
        <h4>Total</h4>
        <h4>৳ { total.price }</h4>
      </div>
    </div>
  )
}

export default CartTotal;

