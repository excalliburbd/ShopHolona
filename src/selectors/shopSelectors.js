import { createSelector } from 'reselect';
import moment from 'moment';

export const getProcutsArray = state => state.products;
export const getFeaturedProcutsArray = state => state.featuredProducts;
export const getProcutEntities = state => state.entities.products;
export const getCategoriesArray = state => state.categories;
export const getCategoriesEntities = state => state.entities.categories;
export const getUserDetails = state => state.user;
export const getContacts = state => state.shop.contacts;
export const getAddresses = state => state.shop.address;
export const getShopName = state => state.shop.information.name;
export const getShopDomain = state => state.shop.subdomain;
export const getHours = state => ([
  moment(state.shop.hours_from).format('DD/MM/YYYY').toString(),
  moment(state.shop.hours_to).format('DD/MM/YYYY').toString()
]);
export const getTradeLicence = state => ({
  number: state.shop.trade_license_number,
  image: state.shop.trade_license_image
});

export const getCategories = createSelector(
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

export const getProducts = createSelector(
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

export const getFeaturedProducts = createSelector(
  [getFeaturedProcutsArray, getProcutEntities],
  (productsArr, productsObj) => {
    return productsArr.map( id => productsObj[id] );
  }
);

export const getVendors = createSelector(
  [getUserDetails],
  (user) => {
    if((user.registered_as === 0) || (user.registered_as === 1)) {
      return true;
    }

    return false;
  }
);

export const getPhones = createSelector(
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

export const getAddress = createSelector(
  [getAddresses],
  addressObj => {
    return addressObj[1];
  }
);

export const getAllAddresses = createSelector(
  [getAddresses],
  addressObj => {
    return Object.keys(addressObj).map(
      id => addressObj[id]
    )
  }
)
