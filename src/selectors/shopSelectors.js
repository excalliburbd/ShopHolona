import { createSelector } from 'reselect';

export const getShopID = state => state.shop.id;
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
export const getHours = state => ({
  from: state.shop.information.hours_from,
  to: state.shop.information.hours_to
});
export const getTradeLicence = state => ({
  number: state.shop.trade_license_number,
  img: state.shop.trade_license_image
});
export const getShopInfo = state => state.shop.information;
export const getIsFcom = state => state.shop.fcom;
export const getFacebook = state => state.shop.fb_link;
export const getProductDetailsID = state => state.ui.shopPage.product;
export const getProductDetailsIsFeaturedProduct = state => (getFeaturedProcutsArray(state).indexOf(getProductDetailsID(state)) !== -1)

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
                                products.filter( product => ( product.category.id === obj.id )),
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

export const getVendor = createSelector(
  [getUserDetails],
  (user) => {
    if(user.registered_as === 1) {
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
);

export const getPhone = createSelector(
  [getPhones],
  phone => {
    return phone[0];
  }
);

export const getAddress = createSelector(
  [getAddresses],
  addressArr => {

    return addressArr[0];
  }
);

// export const getAllAddresses = createSelector(
//   [getAddresses],
//   addressObj => {
//     return Object.keys(addressObj).map(
//       id => addressObj[id]
//     )
//   }
// );
