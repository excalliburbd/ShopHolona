import React, { Component } from 'react';
import { connect } from 'react-redux'

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

const Cart = (props) => (
  <div>Cart list</div>
)

export default connect(stateToProps, actionsToState)(Cart);
