import React, { Component } from 'react';
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input/Input';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

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

const customItem  = item => (<div style={{
    backgroundColor: item.color,
    width: '1.2em',
    height: '1.2em'
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
            <h4>Your Cart</h4>
            <p>3 items</p>
          </div>
          <div className="cart-header-total">
            <p>Total</p>
            <h4>৳ 6820</h4>
          </div>
        </header>
        <ul className="product-list">
          <li className="product-list-item">
            <div>
              <img src={img} alt="Cup" style={{ maxWidth: '70px', maxHeight: '70px'}}/>
            </div>
            <h4>Product Name</h4>
            <div className="product-quantity">
              <span>+</span>
              <Input type='text' name='name' value={0}/>
              <span>-</span>
            </div>
            <div>
              <Dropdown
                auto={false}
                source={this.colors}
                onChange={this.handleColorChange}
                template={customItem}
                value={this.state.color}
              />
            </div>
            <div>
              <Dropdown
                source={this.others}
                onChange={this.handleOtherChange}
                value={this.state.other}
              />
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(stateToProps, actionsToState)(Cart);
