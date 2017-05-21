import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getAllProducts } from '../actions/productsActions';
import { getShopCategories } from '../actions/shopActions';

import ShopPage from '../components/ShopPage';

const getProcutsArray = state => state.products;
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

const getVendors = createSelector(
  [getUserDetails],
  (user) => {
    if(user.registered_as) {
      return (user.registered_as === 1)
    }

    return false;
  }
);

const mapStateToProps = state => {
  return {
    details: state.ui.shopPage.details,
    shopName: state.shop.name,
    shortDesc: state.shop.shortDescription,
    token: state.user.token,
    shop: state.user.shop,
    shopCategories: getCategories(state),
    products: getProducts(state),
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
    getAllProducts: shop => {
      dispatch(getAllProducts(shop));
    },
    getShopCategories: shop => {
      dispatch(getShopCategories(shop))
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
    }
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(ShopPage);

export default FilterBarContainer;
