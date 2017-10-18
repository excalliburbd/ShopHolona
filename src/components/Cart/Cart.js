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
    {
      loading
      ?
      <Loader />
      :
      <div>
        <CartTotal total={ total }
                   cartItems={ cartItems }/>
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
        <div className="cart-actions">
          <Button label="Checkout"
                  raised
                  className="cart-action-checkout--btn sh-btn--yellow"
                  onClick={ () => {
                    if (cartItems.length < 1) {
                      handleNoItemsInCartNotification();
                    } else {
                      handleShowCheckout(token);
                    }
                  } } />
        </div>
      </div>
    }
    </div>
  )
}

export default Cart;
