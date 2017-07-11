import React from 'react';
import {connect} from 'react-redux';
import NotificationsSystem from 'reapop';
import theme from '../themes/reapop';

const Notification = () => {
  return (
    <NotificationsSystem theme={ theme } />
  );
}

const mapStateToProps = state => {
  return {
    // notifications: state.ui.notifications
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Notification);

export default NotificationContainer;
