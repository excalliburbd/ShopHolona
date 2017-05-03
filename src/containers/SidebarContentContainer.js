import { connect } from 'react-redux';

import SidebarContent from '../components/SidebarContent';

const mapStateToProps = state => {
  return {
    type: state.ui.sidebar.type
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const SidebarContentContainer = connect(mapStateToProps, mapDispatchToProps)(SidebarContent);

export default SidebarContentContainer;
