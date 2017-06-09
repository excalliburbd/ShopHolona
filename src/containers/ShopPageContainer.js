import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getCategory } from '../thunks/productThunks';

import {
  sidebarActions,
  shopActions,
  imageUploaderActions,
  cartActions,
} from '../actions/';

import ShopPage from '../components/ShopPage';

import {
  getCategories,
  getProducts,
  getFeaturedProducts,
  getVendors,
  getPhones,
  getAddress,
} from '../selectors/shopSelectors';

const mapStateToProps = state => {
  return {
    details: state.ui.shopPage.details,
    shopName: state.shop.shop_name,
    shortDesc: state.shop.short_descr,
    token: state.user.token,
    shop: state.shop.id,
    shopCategories: getCategories(state),
    products: getProducts(state),
    featuredProducts: getFeaturedProducts(state),
    selectedChip: state.ui.shopPage.chip,
    vendor: getVendors(state),
    proficePic: state.shop.prof_pic,
    coverPhoto: state.shop.cover_photo,
    shopPhones: getPhones(state),
    shopAddress: getAddress(state),
    productDetails: state.ui.shopPage.showProductDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleDetails: () => {
      dispatch(shopActions.shop.toggleDetails())
    },
    selectChip: index => {
      dispatch(shopActions.shop.updateChip(index));
    },
    handleShowProductDetails: (vendor, product) => {
      if (vendor) {
        dispatch(sidebarActions.sidebar.show.addProductDetails(product));
      } else {
        dispatch(shopActions.shop.toggle.productDetails(product));
      }
    },
    handleAddProduct: () => {
      dispatch(sidebarActions.sidebar.show.addProduct());
      dispatch(getCategory());
    },
    handleShowImageUploader: type => {
      dispatch(imageUploaderActions.imageUploader.show.uploader(type));
    },
    handleEditContactNumber: (id, value) => {
      dispatch(shopActions.shop.set.contactNumber({ id, value }));
    },
    handleAddToCart: payload => {

      dispatch(sidebarActions.sidebar.show.addToCart());

      dispatch(cartActions.cart.add.item(payload));
    },
  }
}

const FilterBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopPage));

export default FilterBarContainer;
