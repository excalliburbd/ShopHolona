import React from 'react';

import CartItem from './CartItem';

import './Cart.css';

const Cart = ({
  cartItems,
  totalPrice,
  products,
  updateCartItem,
  deleteCartItem
}) => (
  <div className="cart-container">
    <header className="cart-header">
      <div className="cart-header-text">
        <h4>{cartItems.length} items</h4>
      </div>
      <div className="cart-header-total">
        <h4>Total</h4>
        <h4>৳ {totalPrice}</h4>
      </div>
    </header>
    <ul className="cart-product-list">
      { cartItems.map(cartItem => (
              <CartItem cartItem={cartItem}
                        key={cartItem.id}
                        products={ products }
                        updateCartItem={ updateCartItem }
                        deleteCartItem={ deleteCartItem }/>
            ))
      }
    </ul>
  </div>
)

export default Cart;
