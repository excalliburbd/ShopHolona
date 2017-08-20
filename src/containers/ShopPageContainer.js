import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addNotification } from 'reapop';

import ShopPage from '../components/ShopPage';

import {
  sidebarActions,
  shopActions,
  imageUploaderActions,
  productActions,
  tourActions,
} from '../actions/';


import {
  makeFeaturedProduct,
  removeFromFeaturedProduct,
  getAllAttributes,
} from '../thunks/productThunks';
import {
  runShopInfoUpdate
} from '../thunks/shopThunks';
import {
  followShop,
  unfollowShop,
} from '../thunks/userThunks';
import { getCategory } from '../thunks/productThunks';
import { addToCart } from '../thunks/cartThunks';

import {
  getCategories,
  getProducts,
  getFeaturedProducts,
  getPhones,
  getAddress,
  getProductDetailsID,
  getProductDetailsIsFeaturedProduct,
} from '../selectors/shopSelectors';
import {
  getVendor,
  following,
} from '../selectors/userSelectors';
import {
  getTourIsOpen,
  getCurrentStep,
} from '../selectors/tourSelectors';

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
    profilePic: state.shop.prof_pic,
    coverPhoto: state.shop.cover_photo,
    shopPhones: getPhones(state),
    shopAddress: getAddress(state),
    productDetails: state.ui.shopPage.showProductDetails,
    selectedProductDetails: state.entities.products[getProductDetailsID(state)],
    productDetailstabIndex: state.ui.shopPage.detailsTab,
    featured: getProductDetailsIsFeaturedProduct(state),
    editDesc: state.ui.shopPage.editDesc && getVendor(state),
    following: following(state),
    tourIsOpen: getTourIsOpen(state),
    tourCurrentStep: getCurrentStep(state),
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
      dispatch(getAllAttributes());
    },
    handleShowImageUploader: (type, tourIsOpen, tourCurrentStep) => {
      if (tourIsOpen && (tourCurrentStep === 3|| tourCurrentStep === 5)) {
        dispatch(tourActions.tour.set.interrupt({ state: true, step: tourCurrentStep}));
        dispatch(imageUploaderActions.imageUploader.set.tourInterrupt(true));
        dispatch(tourActions.tour.set.open(false));
      }
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
    },
    handleFollowShop: (shop, token, name) => {
      dispatch(followShop(shop, token, name));
    },
    handleUnfollowShop: (shop, token, name) => {
      dispatch(unfollowShop(shop, token, name));
    },
    handlePromptSignIn: name => {
      dispatch(addNotification({
        title: 'Please Log In',
        message: `Log In to follow ${name}`,
        position: 'bl',
        status: 'error',
      }));
      dispatch(sidebarActions.sidebar.show.signIn());
    }
  }
}

const FilterBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopPage));

export default FilterBarContainer;
