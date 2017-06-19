import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Card from 'react-toolbox/lib/card/Card';
import IconButton from 'react-toolbox/lib/button/IconButton';

import MdClose from 'react-icons/lib/md/close';

const customItem  = item => (
  <div className="cart-attributes-color" style={{
    backgroundColor: item.color,
    width: "1.4em",
    height: "1.4em",
    borderRadius: "50%"
  }}></div>
);

const CartItem = ({
  cartItem,
  product,
  updateCartItem,
  deleteCartItem,
  token,
}) => {

  const variant = product.variances.find(
    item => (item.id === cartItem.product_variance_attribute.variance.id)
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
            <h4>{ product.name }</h4>
          </div>
          <div className="cart-product-attributes">
            <div className="cart-product-quantity">
              <span className="cart-attributes-title">Quantity</span>
              <div className="cart-product-quantity-body">
                <span onClick={
                        () => updateCartItem(
                                cartItem.id,
                                attribute.id,
                                cartItem.quantity + 1,
                                token
                              )
                     }>+</span>
                <Input className="cart-quantity-input"
                       type='text'
                       name='name'
                       value={ cartItem.quantity } />
                <span onClick={
                        () => updateCartItem(
                                cartItem.id,
                                attribute,
                                cartItem.quantity - 1,
                                token
                              )
                     }>-</span>
              </div>
            </div>
            <div className="cart-dropdown-attribute-colors">
              <span className="cart-attributes-title">Color</span>
              <Dropdown className="cart-dropdown-colors"
                        auto={false}
                        source={ primary }
                        template={ customItem }
                        value={ variant.type.value }
              />
            </div>
            <div className="cart-dropdown-attribute-others">
              <span className="cart-attributes-title">Size</span>
              <Dropdown className="cart-dropdown-others"
                        source={ secondary }
                        value={ attribute.type.value }
              />
            </div>
            <div className="cart-product-price">
              <h3>৳ { attribute.price * cartItem.quantity }</h3>
              <h5>৳ { attribute.price } each</h5>
            </div>
          </div>
          <IconButton className="cart-product-delete"
                      icon={<MdClose />}
                      onClick={ () => deleteCartItem(cartItem.id, token) } />
        </div>
      </Card>
    </li>
  );
}

export default CartItem;
