import { connect } from 'react-redux';

import ShopPage from '../components/ShopPage';

const mapStateToProps = state => {
  return {
    details: state.ui.shopPage.details,
    shopName: state.shop.name,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleDetails: () => {
      dispatch({
        type: 'TOGGLE_SHOPPAGE_UI_DETAILS'
      })
    }
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(ShopPage);

export default FilterBarContainer;
