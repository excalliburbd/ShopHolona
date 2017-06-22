import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getCategory } from '../thunks/productThunks';
import { addToCart } from '../thunks/cartThunks';

import {
  sidebarActions,
  shopActions,
  imageUploaderActions,
  cartActions,
  productActions,
} from '../actions/';

import {
  makeFeaturedProduct,
  removeFromFeaturedProduct,
} from '../thunks/productThunks';
import {
  runShopInfoUpdate
} from '../thunks/shopThunks';

import ShopPage from '../components/ShopPage';

import {
  getCategories,
  getProducts,
  getFeaturedProducts,
  getVendor,
  getPhones,
  getAddress,
  getProductDetailsID,
  getProductDetailsIsFeaturedProduct,
} from '../selectors/shopSelectors';

const mapStateToProps = state => {
  return {
    details: state.ui.shopPage.details,
    shopName: state.shop.shop_name,
    shortDesc: state.shop.information.description,
    info: state.shop.information,
    token: state.user.token,
    shop: state.shop.id,
    shopCategories: getCategories(state),
    products: getProducts(state),
    featuredProducts: getFeaturedProducts(state),
    selectedChip: state.ui.shopPage.chip,
    vendor: getVendor(state),
    proficePic: state.shop.prof_pic,
    coverPhoto: state.shop.cover_photo,
    shopPhones: getPhones(state),
    shopAddress: getAddress(state),
    productDetails: state.ui.shopPage.showProductDetails,
    selectedProductDetails: state.entities.products[getProductDetailsID(state)],
    productDetailstabIndex: state.ui.shopPage.detailsTab,
    featured: getProductDetailsIsFeaturedProduct(state),
    editDesc: state.ui.shopPage.editDesc && getVendor(state)
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
    handleAddToCart: (id, token, productID) => {
      dispatch(addToCart(id, token, productID));
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
    },
    makeFeaturedProduct: (id, shop, token) => {
      dispatch(makeFeaturedProduct(id, shop, token));
    },
    deleteFromFeaturedProduct: (id, featuredID, shop, token) => {
      dispatch(removeFromFeaturedProduct(id, featuredID, shop, token));
    },
    handleSaveDescription: (info, shop, token) => {
      dispatch(runShopInfoUpdate(info, shop, token));
    },
    handleEditDescription: value => {
      dispatch(shopActions.shop.edit.description(value));
    },
    handleShowEditDescription: () => {
      dispatch(shopActions.shop.set.editDesc(true));
    }
  }
}

const FilterBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopPage));

export default FilterBarContainer;
