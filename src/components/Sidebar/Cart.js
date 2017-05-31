import React, { Component } from 'react';
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input/Input';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Card from 'react-toolbox/lib/card/Card';

import './Cart.css'

const stateToProps = state => ({
  cartItems: state.cart.items
})

const actionsToState = dispatch => ({
  // updateUser: payload => {
  //   if (payload.date_of_birth === '' || payload.date_of_birth === null) {
  //     delete payload.date_of_birth
  //   }
  //
  //   dispatch(updateUser(payload))
  // },
})

const img = 'https://images.unsplash.com/photo-1485091466790-3735fe896408?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg='

const customItem  = item => (<div className="cart-attributes-color" style={{
    backgroundColor: item.color,
    width: "1.4em",
  height: "1.4em",
  borderRadius: "50%"
}}></div>)

class Cart extends Component {
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
      });
  };

  handleOtherChange = value => {
    this.setState({
      other: value
    });
  };

  render(){
    return (
      <div className="cart-container">
        <header className="cart-header">
          <div className="cart-header-text">
            <h4>3 items</h4>
          </div>
          <div className="cart-header-total">
            <h3>Total</h3>
            <h4>৳ 6820</h4>
          </div>
        </header>
        <ul className="cart-product-list">
          <li className="cart-product-list-item-container">
            <Card className="cart-product-list-item-card">
              <div className="cart-item-img">
                <img src={img} alt="Cup" style={{ width: '70px', height: '70px'}}/>
              </div>
              <div className="cart-item-details">
                <div className="cart-item-name">
                  <h4>Product Name</h4>
                </div>
                <div className="cart-product-attributes">
                  <div className="cart-product-quantity">
                    <span>+</span>
                    <Input className="cart-quantity-input" type='text' name='name' value={20}/>
                    <span>-</span>
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
                    <h3>Total Price</h3>
                    <h5>Each Price</h5>
                  </div>
                </div>
              </div>
            </Card>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(stateToProps, actionsToState)(Cart);
