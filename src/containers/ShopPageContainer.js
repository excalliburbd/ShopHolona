import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import { getCategory } from '../thunks/productThunks';

import {
  sidebarActions,
  shopActions,
  imageUploaderActions,
  cartActions,
  productActions,
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
    selectedProductDetails: state.entities.products[state.ui.shopPage.product],
    productDetailstabIndex: state.ui.shopPage.detailsTab,
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
        dispatch(shopActions.shop.toggle.productDetails(product.id));
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
    handleAddToCart: (id, variances) => {

      dispatch(sidebarActions.sidebar.show.addToCart());

      dispatch(cartActions.cart.add.item({
                            id: uuid.v4(),
                            productId: id,
                            varianceParentId: variances[0].id,
                            varianceId: variances[0].attributes[0].id,
                            price: variances[0].attributes[0].price,
                            quantity: 1
                          }));
    },
    handleToggleProductDetails: payload => {
      dispatch(shopActions.shop.toggle.productDetails(payload));
      dispatch(shopActions.shop.set.detailsTab(0));
    },
    handleSetVariant: (id, key) => {
      dispatch(productActions.products.ui.set.productVariance({ id, key }));
    },
    handleSetAttribute: (id, key) => {
      dispatch(productActions.products.ui.set.productAttribute({ id, key }));
    },
    handleProductDetailsTab: tab => {
      dispatch(shopActions.shop.set.detailsTab(tab));
    }
  }
}

const FilterBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopPage));

export default FilterBarContainer;
