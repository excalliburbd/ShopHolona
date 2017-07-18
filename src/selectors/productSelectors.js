import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

import {
  getIsFcom
} from './shopSelectors';

export const getCategoriesObj = state => state.ui.categories.categories;
export const getSubCategoriesObj = state => state.ui.categories.subCategories;
export const getSubSubCategoriesObj = state => state.ui.categories.subSubCategories;
export const getProductPrimaryAttributes = state => state.ui.categories.attributes.primary;
export const getSecondaryAttributes = state => state.ui.categories.attributes.secondary;
export const getProductUIState = state => state.ui.product;
export const getProductCategory = state => state.ui.product.category;
export const getProductSubCategory = state => state.ui.product.subCategory;
export const getProductSubSubCategory = state => state.ui.product.subSubCategory;
export const getProductName = state => state.ui.product.name;
export const getProductWeight = state => state.ui.product.weight;
export const getProductPrice = state => state.ui.product.price;
export const getFcomPrice = state => state.ui.product.fcomPrice;
export const getProductDescription = state => state.ui.product.description;
export const getSubSubCategoryID = state => state.ui.categories.subSubCategoryID;
export const getCategoryID = state => state.ui.categories.categoryID;
export const getSubCategoryID = state => state.ui.categories.subCategoryID;
export const getRadioValue = state => state.ui.sidebar.radio;
export const getProgress = state => state.ui.categories.uploadProgress;
export const getSelectedProduct = state => state.ui.product.selectedProduct;
export const getSelectedProductID = state => state.ui.product.selectedProduct.id;
export const getProductsArray = state => state.products;
export const getProductsObj = state => state.entities.products;
export const getUploadCount = state => state.ui.uploader.uploadCount;
export const getDoneUploadCount = state => state.ui.uploader.doneUploadCount;
export const getProductDetailfcomPrice = state => state.ui.product.selectedProduct.fcomPrice;

export const getFusedCategories = createSelector(
  [getCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

export const getFusedSubCategories = createSelector(
  [getSubCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

export const getFusedSubSubCategories = createSelector(
  [getSubSubCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

export const getShowAddColors = createSelector(
  [getProductUIState, getRadioValue, getSubSubCategoryID],
  (product, radio, id) => {
    let show = true;

    Object.keys(product).forEach(
      name => {
        // this is not possible due to server limitation
        // if(name !== 'description' &&  product[name] === '') {
        //   show = false;
        // }

        if (product[name] === '') {
          show = false;
        }
      }
    )

    if(radio === 'SERVICE') {
      show = false;
    }

    return id && show;
  }
);

export const getShowAddVariances = createSelector(
  [getProductUIState, getRadioValue, getSubSubCategoryID],
  (product, radio, id) => {
    let show = true;

    Object.keys(product).forEach(
      name => {
        // this is not possible due to server limitation
        // if(name !== 'description' &&  product[name] === '') {
        //   show = false;
        // }

        if (product[name] === '') {
          show = false;
        }
      }
    )

    if(radio === 'SERVICE') {
      show = false;
    }

    return !id && show;
  }
);

export const getShowAddImages = createSelector(
  [getProductPrimaryAttributes],
  (primary) => {
    let show = true;

    primary.forEach(
      obj => {
        if(obj.selected === true) {
          show = false;
        }
      }
    )

    return show;
  }
);

export const getFinishedProduct = createSelector(
  [
    getProductName,
    getProductDescription,
    getProductWeight,
    getProductPrice,
    getProductPrimaryAttributes,
    getSecondaryAttributes,
    getSubSubCategoryID,
    getProgress,
    getIsFcom,
    getFcomPrice,
  ],
  (name, description, weight, price, primary, secondary, id, progress, fcom, fprice) => {
    if (!progress.primary && !progress.secondary) {
      return {
        name: name,
        short_desc: description,
        category: id,
        variances: primary
                  .filter(
                    ({ selected }) => selected
                  )
                  .map(
                    obj => ({
                      type: obj.id,
                      key: obj.name,
                      value: obj.value,
                      images: obj.files
                              .filter( ({ apiError }) => !apiError )
                              .map(
                                ({ apiID }) => apiID
                              ),
                      custom: obj.custom,
                      attributes: secondary[obj.id].attributes
                                                    .filter( ({ selected }) => selected )
                                                    .map(
                                                      obj => ({
                                                        type: obj.id,
                                                        description,
                                                        weight,
                                                        price: fcom ? fprice : price,
                                                        stock: obj.stock,
                                                        key: obj.name,
                                                        value: obj.value,
                                                        custom: obj.custom
                                                      })
                                                    )
                    })
                  ),
        status: 3,

      }
    } else {
      return {
        name: name,
        short_desc: description,
        category: id,
        variances: primary
                  .filter(
                    ({ selected }) => selected
                  )
                  .map(
                    obj => ({
                      type: obj.id,
                      images: obj.files
                              .filter( ({ apiError }) => !apiError )
                              .map(
                                ({ apiID }) => apiID
                              ),
                      attributes: secondary[obj.id].attributes
                                                    .filter( ({ selected }) => selected )
                                                    .map(
                                                      obj => ({
                                                        type: obj.id,
                                                        description,
                                                        weight,
                                                        price: fcom ? fprice : price,
                                                        stock: obj.stock,
                                                      })
                                                    )
                    })
                  ),
      status: 3,

      }
    }
  }
);

export const getShowProductDetails = createSelector(
  [getCategoryID, getSubCategoryID],
  (category, subCategory) => {
    return (category && subCategory)
  }
);

export const getSelectedFeturedPrductID = createSelector(
  [getSelectedProductID, getProductsObj],
  (id, productsObj) => {
    if (productsObj[id]){
      return productsObj[id].featuredID
    }

    return null;
  }
);

export const getShowDone = createSelector(
  [getUploadCount, getDoneUploadCount],
  (upload, done) => {
    return (upload === done)
  }
);

export const getAllProducts = createSelector(
  [getProductsArray, getProductsObj],
  (arr, obj) => {
    return arr.map(
      id => obj[id]
    )
  }
);

export const getPrimaryAttributes = createSelector(
  [getProductPrimaryAttributes, getSelectedProductID, getSelectedProduct],
  (attr, id, product) => {
    console.log('running', product)
    if (id) {
      return [ 'edit', product];
    }

    return attr
  }
)
