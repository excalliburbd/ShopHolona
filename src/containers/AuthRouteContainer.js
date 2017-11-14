import {connect} from 'react-redux';
import React, { Component } from 'react';

import { request, getConfig } from '../thunks/helpers';

import AuthRoute from '../components/AuthRoute';

import {
  getUserDetails,
  getToken,
} from '../selectors/userSelectors';
import {
 getShopID
} from '../selectors/shopSelectors';
import { setTimeout } from 'core-js/library/web/timers';

const mapStateToProps = state => {
  return {
    user: getUserDetails(state),
    shop: getShopID(state),
    token: getToken(state),
  }
}

const AuthMiddleWareContainer = AuthWrappedComponent =>
  class AuthWrapperInnerComponent extends Component {
    constructor(props) {
      super(props);

      const {
        token,
        shopvendor,
        registered_as,
      } = this.props.user;

      this.state = {
        isVendor: token && registered_as === 1 && shopvendor,
        loading: true,
      }
    }

    componentDidMount()  {
      setTimeout(() => {
        if (!this.props.token) {
          this.setState({
            loading: false,
          })
        }
      }, 1000);
    }

    componentWillReceiveProps(nextProps) {
      const {
        user,
        shop,
        token,
      } = nextProps;

      if (
        this.props.user.token !== user.token ||
        this.props.user.shopvendor !== user.shopvendor ||
        this.props.user.registered_as !== user.registered_as ||
        (this.props.shop && this.props.shop !== shop)
      ) {
        request('/me/', getConfig(
          token
        )).then(
          me => {
            if (me.id) {
              request(`/vendors/shops/${shop}/`, getConfig(
                token
              )).then(
                res => {
                  if( res.id ) {
                    this.setState({
                      isVendor: me.registered_as === 1,
                      loading: false,
                    });
                  }
                }
              ).catch(
                err => this.setState({
                  loading: false,
                })
              );
            }
          }
        )
      }
    }

    render() {
      return (
        <AuthWrappedComponent loading={ this.state.loading } isVendor={ this.state.isVendor } { ...this.props } />
      );
    }
  }

const AuthRouteContainer = connect(mapStateToProps)(AuthMiddleWareContainer(AuthRoute));

export default AuthRouteContainer;
