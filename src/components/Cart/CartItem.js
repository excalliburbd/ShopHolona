import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
// import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Card from 'react-toolbox/lib/card/Card';
// import IconButton from 'react-toolbox/lib/button/IconButton';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

// import MdClose from 'react-icons/lib/md/close';

import './CartItem.css'

// const customItem  = item => (
//   <div className="cart-attributes-color" style={{
//     backgroundColor: item.color,
//     width: "1.4em",
//     height: "1.4em",
//     borderRadius: "50%"
//   }}></div>
// );

const CartItem = ({
  cartItem,
  product,
  updateCartItem,
  deleteCartItem,
  handleMinimumItemsInCartNotification,
  token,
}) => {

  const variant = product.variances.find(
    item => (item.id === cartItem.variance.id)
  );

  const attribute = variant.attributes.find(
    item => (item.id === cartItem.product_variance_attribute.id)
  );

  const primary = product.variances.map(
    variant => ({
      value: variant.id,
      label: variant.type.value
    })
  );

  const secondary = variant.attributes.map(
    attribute => ({
      value: attribute.id,
      label: attribute.type.value
    })
  );

  return (
    <li className="cart-product-list-item-container">
      <Card className="cart-product-list-item-card">
        <div className="cart-item-img">
          <img src={ variant.images[0].image }
               alt={ product.name }
               style={{ width: '70px', height: '6rem'}} />
        </div>
        <div className="cart-item-details">
          <div className="cart-item-name">
            <div className="cart-item-name--title" title={product.name}>{ product.name }</div>
          </div>
          <div className="cart-item-info">
            <div className="cart-product-attributes">
              <div className="cart-variant-name">Color : { primary[product.selectedVariant].label }</div>

              <div className="cart-variant-size">Size : { secondary[product.selectedVariant].label }</div>

              <div className="cart-product-quantity">
                <span className="cart-attributes-title">Quantity</span>
                <div className="cart-product-quantity-body">
                <span className="minus" onClick={
                    () => {
                      if (cartItem.quantity > 1) {
                        updateCartItem(
                          cartItem.id,
                          attribute.id,
                          cartItem.quantity - 1,
                          token
                        )
                      }

                      if (cartItem.quantity === 1) {
                        // deleteCartItem(cartItem.id, token);
                        handleMinimumItemsInCartNotification();
                      }
                    }
                  }>-</span>
                  <Input className="cart-quantity-input"
                         type='text'
                         name='name'
                         value={ cartItem.quantity } />

                  <span className="plus" onClick={
                  () => updateCartItem(
                    cartItem.id,
                    attribute.id,
                    cartItem.quantity + 1,
                    token
                  )
                }>+</span>
                </div>
              </div>
            </div>
            <div className="cart-product-price">
              <h3>৳ { attribute.sh_price * cartItem.quantity }</h3>
              <h5>(TK { attribute.sh_price } each)</h5>
            </div>
          </div>
          <FontIcon
            className="cart-product-delete"
            value="add_circle"
            onClick={ () => deleteCartItem(cartItem.id, token) }
          />
        </div>
      </Card>
    </li>
  );
}

export default CartItem;
