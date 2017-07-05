import React from 'react';
import {connect} from 'react-redux';

import Notifications from 'react-notification-system-redux';

const Notification = ({ notifications }) => {
  return (
    <Notifications notifications={ notifications } />
  );
}

const mapStateToProps = state => {
  return {
    notifications: state.ui.notifications
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Notification);

export default NotificationContainer;
