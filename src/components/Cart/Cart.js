import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import CartItem from './CartItem';
import CartTotal from './CartTotal';

import Loader from '../Loader';

import './Cart.css';

const Cart = ({
  cartItems,
  total,
  products,
  updateCartItem,
  deleteCartItem,
  token,
  handleNoItemsInCartNotification,
  handleMinimumItemsInCartNotification,
  loading,
  handleShowCheckout,
}) => {

  return (
    <div className="cart-container">
      <div className="cart-content">
      {
        loading
        ?
        <Loader />
        :
        <ul className="cart-product-list">
          {
            cartItems.map(
              (cartItem, key) =>  <CartItem cartItem={ cartItem }
                                            key={ key }
                                            token={ token }
                                            product={ products[cartItem.product.id] }
                                            updateCartItem={ updateCartItem }
                                            deleteCartItem={ deleteCartItem }
                                            handleMinimumItemsInCartNotification={ handleMinimumItemsInCartNotification }/>
            )
          }
        </ul>
      }
      </div>
      <div className="cart-actions">
        <CartTotal total={ total }
                   cartItems={ cartItems }/>
        <br />
        <Button label="Checkout"
                raised
                className="cart-action-checkout--btn sh-btn--yellow"
                onClick={ () => {
                  if (cartItems.length < 1) {
                    handleNoItemsInCartNotification();
                  } else {
                    handleShowCheckout(token);
                  }
                }} />
      </div>
    </div>
  )
}

export default Cart;
