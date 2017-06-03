import React, { Component } from 'react';
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input/Input';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Card from 'react-toolbox/lib/card/Card';
import * as types from '../../constants/cart'

const stateToProps = state => ({
  products: state.entities.products,
})

const actionsToState = dispatch => ({
  updateCartItem: (id, payload) =>  dispatch({
    type: types.CART_ITEM_UPDATE_SUCCESS,
    id,
    payload,
  }),
  deleteCartItem: (id) => dispatch({
    type: types.CART_ITEM_DELETE_SUCCESS,
    id,
  })
})

const customItem  = item => (
  <div className="cart-attributes-color" style={{
    backgroundColor: item.color,
    width: "1.4em",
    height: "1.4em",
    borderRadius: "50%"
  }}></div>
)

class CartItem extends Component {
  state = {
    other: 3,
    color: 3,
  }

  colors = [
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 3, color: 'green' },
    { value: 4, color: 'yellow' },
  ]

  others = [
    { value: 1, label: 'S' },
    { value: 2, label: 'M' },
    { value: 3, label: 'L' },
    { value: 1, label: 'XL' },
  ]

  handleColorChange = value => {
    this.setState({
      color: value
    })
  }

  handleOtherChange = value => {
    this.setState({
      other: value
    })
  }

  increaseQuantity = () => {
    let { cartItem } = this.props
    this.props.updateCartItem(cartItem.id, { quantity: cartItem.quantity + 1 })
  }

  decreaseQuantity = () => {
    let { cartItem } = this.props
    if (cartItem.quantity > 1) this.props.updateCartItem(cartItem.id, { quantity: cartItem.quantity - 1 })
  }

  deleteCartItem = () => {
    this.props.deleteCartItem(this.props.cartItem.id)
  }

  render(){
    let { cartItem } = this.props
    const product = this.props.products[cartItem.productId]
    const variance = product.variances.find(variance => variance.id === cartItem.varianceId)

    return (
      <li className="cart-product-list-item-container">
        <Card className="cart-product-list-item-card">
          <div className="cart-item-img">
            <img src={variance.images[0].image} alt={product.name} style={{ width: '70px', height: '70px'}}/>
          </div>
          <div className="cart-item-details">
            <div className="cart-item-name">
              <h4>{product.name}</h4>
            </div>
            <div className="cart-product-attributes">
              <div className="cart-product-quantity">
                <span onClick={this.increaseQuantity}>+</span>
                <Input className="cart-quantity-input" type='text' name='name' value={cartItem.quantity}/>
                <span onClick={this.decreaseQuantity}>-</span>
              </div>
              <div className="cart-dropdown-attribute-colors">
                <Dropdown
                  className="cart-dropdown-colors"
                  auto={false}
                  source={this.colors}
                  onChange={this.handleColorChange}
                  template={customItem}
                  value={this.state.color}
                />
              </div>
              <div className="cart-dropdown-attribute-others">
                <Dropdown
                  className="cart-dropdown-others"
                  source={this.others}
                  onChange={this.handleOtherChange}
                  value={this.state.other}
                />
              </div>
              <div className="cart-product-price">
                <h3>{ cartItem.price * cartItem.quantity }</h3>
                <h5>{ variance.attributes[0].price }</h5>
              </div>
            </div>
            <button onClick={this.deleteCartItem}>X</button>
          </div>
        </Card>
      </li>
    )
  }
}

export default connect(stateToProps, actionsToState)(CartItem);
