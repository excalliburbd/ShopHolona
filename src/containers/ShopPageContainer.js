import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';

import { getCategory } from '../actions/productsActions';

import ShopPage from '../components/ShopPage';

const getProcutsArray = state => state.products;
const getFeaturedProcutsArray = state => state.featuredProducts;
const getProcutEntities = state => state.entities.products;
// const getCategoriesArray = state => state.categories;
const getCategoriesEntities = state => state.shop.categories;
const getUserDetails = state => state.user;

const getCategories = createSelector(
  [getCategoriesEntities],
  (categoriesObj) => {
    return [
      {
        id: 'META_ALL',
        name: 'All',
        first_parent: {
          id: -1
        }
      },
      ...Object.keys(categoriesObj).map( id => categoriesObj[id])
    ]
  }
);

const getProducts = createSelector(
  [getProcutsArray, getProcutEntities, getCategories],
  (productsArr, productsObj, categories) => {
    const products = productsArr.map( id => productsObj[id] );

    return categories.map(
             obj => ({
                      ...obj,
                      products: ( obj.id === 'META_ALL') ? products :
                                products.filter( product => ( product.category === obj.id )),
                    })
           )
  }
);

const getFeaturedProducts = createSelector(
  [getFeaturedProcutsArray, getProcutEntities],
  (productsArr, productsObj) => {
    return productsArr.map( id => productsObj[id] );
  }
);

const getVendors = createSelector(
  [getUserDetails],
  (user) => {
    if((user.registered_as === 0) || (user.registered_as === 1)) {
      return true;
    }

    return false;
  }
);

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
    selectedChip: state.shop.chip,
    vendor: getVendors(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleDetails: () => {
      dispatch({
        type: 'TOGGLE_SHOPPAGE_UI_DETAILS'
      })
    },
    selectChip: index => {
      dispatch({
        type: 'UPDATE_SHOP_CHIP',
        payload: index,
      })
    },
    handleShowProductDetails: (vendor, product) => {
      if (vendor) {
        dispatch({
        type: 'SHOW_SIDEBAR_PRODUCT_DETAILS',
        payload: { product }
      });
      }
    },
    handleAddProduct: () => {
      dispatch({
        type: 'SHOW_SIDEBAR_ADD_PRODUCT'
      });
      dispatch(getCategory());
    },
    handleShowImageUploader: () => {
      dispatch({
        type: 'SHOW_IMAGE_UPLOADER',
      });
    },
  }
}

const FilterBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopPage));

export default FilterBarContainer;
