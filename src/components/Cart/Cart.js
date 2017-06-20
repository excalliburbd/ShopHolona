import React from 'react';

import CartItem from './CartItem';

import './Cart.css';

const Cart = ({
  cartItems,
  total,
  products,
  updateCartItem,
  deleteCartItem,
  token,
}) => {
  return (
    <div className="cart-container">
      <header className="cart-header">
        <div className="cart-header-text">
          <h4>{ cartItems.length } items</h4>
        </div>
        <div className="cart-header-total">
          <h4>Total</h4>
          <h4>৳ { total.price } - { total.weight } gm</h4>
        </div>
      </header>
      <ul className="cart-product-list">
        {
          cartItems.map(
            (cartItem, key) =>  <CartItem cartItem={ cartItem }
                                          key={ key }
                                          token={ token }
                                          product={ products[cartItem.product.id] }
                                          updateCartItem={ updateCartItem }
                                          deleteCartItem={ deleteCartItem }/>
          )
        }
      </ul>
    </div>
  )
}

export default Cart;
