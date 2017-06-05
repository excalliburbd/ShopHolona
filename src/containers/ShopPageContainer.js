import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';

import { getCategory } from '../thunks/productThunks';

import { sidebarActions } from '../actions/';
import { shopActions } from '../actions/';
import { imageUploaderActions } from '../actions/';

import ShopPage from '../components/ShopPage';

const getProcutsArray = state => state.products;
const getFeaturedProcutsArray = state => state.featuredProducts;
const getProcutEntities = state => state.entities.products;
const getCategoriesArray = state => state.categories;
const getCategoriesEntities = state => state.entities.categories;
const getUserDetails = state => state.user;
const getContacts = state => state.shop.contacts;
const getAddresses = state => state.shop.address;

const getCategories = createSelector(
  [getCategoriesArray, getCategoriesEntities],
  (categoriesArr, categoriesObj) => {
    return [
      {
        id: 'META_ALL',
        name: 'All',
        first_parent: {
          id: -1,
          name: 'All'
        }
      },
      ...categoriesArr.map( id => categoriesObj[id])
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

const getPhones = createSelector(
  [getContacts],
  contacts => {
    return contacts.filter(
      contact => (contact.type === 0)
    ).map(
      phone => ({
        id: phone.id,
        number: phone.description,
      })
    )
  }
)

const getAddress = createSelector(
  [getAddresses],
  addressObj => {
    return addressObj[1];
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
    selectedChip: state.ui.shopPage.chip,
    vendor: getVendors(state),
    proficePic: state.shop.prof_pic,
    coverPhoto: state.shop.cover_photo,
    shopPhones: getPhones(state),
    shopAddress: getAddress(state)
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
    }
  }
}

const FilterBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopPage));

export default FilterBarContainer;
