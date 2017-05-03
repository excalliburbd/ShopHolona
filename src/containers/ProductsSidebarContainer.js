import { connect } from 'react-redux';

import ProductsSidebar from '../components/ProductsSidebar';

const mapStateToProps = state => {
  return {
    type: state.ui.sidebar.type
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const ProductsSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsSidebar);

export default ProductsSidebarContainer;
