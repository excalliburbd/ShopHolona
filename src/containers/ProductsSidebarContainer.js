import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

import {
  getSubCategory,
  getSubSubCategory,
  saveProduct,
  postImage,
  deleteProduct,
  requestAttribute,
  makeFeaturedProduct,
  removeFromFeaturedProduct,
} from '../thunks/productThunks';

import { sidebarActions } from '../actions/';
import { productActions } from '../actions/';
import { categoryActions } from '../actions/';

import ProductsSidebar from '../components/Sidebar/ProductsSidebar';

const getCategoriesObj = state => state.ui.categories.categories;
const getSubCategoriesObj = state => state.ui.categories.subCategories;
const getSubSubCategoriesObj = state => state.ui.categories.subSubCategories;
const getPrimaryAttributes = state => state.ui.categories.attributes.primary;
const getSecondaryAttributes = state => state.ui.categories.attributes.secondary;
const getProductUIState = state => state.ui.product;
const getProductCategory =  state => state.ui.product.category;
const getProductSubCategory =  state => state.ui.product.subCategory;
const getProductSubSubCategory =  state => state.ui.product.subSubCategory;
const getProductName =  state => state.ui.product.name;
const getProductWeight =  state => state.ui.product.weight;
const getProductPrice =  state => state.ui.product.price;
const getProductDescription =  state => state.ui.product.description;
const getSubSubCategoryID = state => state.ui.categories.subSubCategoryID;
const getCategoryID = state => state.ui.categories.categoryID;
const getSubCategoryID = state => state.ui.categories.subCategoryID;
const getRadioValue = state => state.ui.sidebar.radio;
const getProgress = state => state.ui.categories.uploadProgress;
const getSelectedPrductID = state => state.ui.product.selectedProduct.id;
const getProductsObj = state => state.entities.products;
const getUploadCount = state => state.ui.product.uploadCount;
const getDoneUploadCount = state => state.ui.product.doneUploadCount;

const getFusedCategories = createSelector(
  [getCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

const getFusedSubCategories = createSelector(
  [getSubCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

const getFusedSubSubCategories = createSelector(
  [getSubSubCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

const getShowAddColors = createSelector(
  [getProductUIState, getRadioValue],
  (product, radio) => {
    let show = true;

    Object.keys(product).forEach(
      name => {
        //this is not possible due to server limitation
        // if(name !== 'description' &&  product[name] === '') {
        //   show = false;
        // }

        if(radio === 'SERVICE' && name === 'weight') {
          show = true;
        }
      }
    )

    return show;
  }
);

const getShowAddImages = createSelector(
  [getPrimaryAttributes],
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

const getFinishedProduct = createSelector(
  [
    getProductName,
    getProductDescription,
    getProductWeight,
    getProductPrice,
    getPrimaryAttributes,
    getSecondaryAttributes,
    getSubSubCategoryID,
    getProgress,
  ],
  (name, description, weight, price, primary, secondary, id, progress ) => {
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
                                                        price,
                                                        stock: obj.stock,
                                                        key: obj.name,
                                                        value: obj.value,
                                                        custom: obj.custom
                                                      })
                                                    )
                    })
                  )

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
                                                        price,
                                                        stock: obj.stock,
                                                      })
                                                    )
                    })
                  )

      }
    }
  }
);

const getShowProductDetails = createSelector(
  [getCategoryID, getSubCategoryID],
  (category, subCategory) => {
    return (category && subCategory)
  }
);

const getSelectedFeturedPrductID = createSelector(
  [getSelectedPrductID, getProductsObj],
  (id, productsObj) => {
    if (productsObj[id]){
      return productsObj[id].featuredID
    }

    return null;
  }
);

const getShowDone = createSelector(
  [getUploadCount, getDoneUploadCount],
  (upload, done) => {
    return (upload === done)
  }
);

const mapStateToProps = state => {
  return {
    type: state.ui.sidebar.subType,
    categories: getFusedCategories(state),
    subCategories: getFusedSubCategories(state),
    subSubCategories: getFusedSubSubCategories(state),
    categoryID: getCategoryID(state),
    subCategoryID: getSubCategoryID(state),
    primaryAttributes: getPrimaryAttributes(state),
    secondaryAttributes: getSecondaryAttributes(state),
    radioValue: getRadioValue(state),
    selectedAttribute: state.ui.categories.attributes.selected,
    showAddColors: getShowAddColors(state),
    showAddImages: getShowAddImages(state),
    productCategory: getProductCategory(state),
    productSubCategory: getProductSubCategory(state),
    productSubSubCategory: getProductSubSubCategory(state),
    productName: getProductName(state),
    productWeight: getProductWeight(state),
    productPrice: getProductPrice(state),
    productDescription: getProductDescription(state),
    finishedProduct: getFinishedProduct(state),
    token: state.user.token,
    shop: state.shop.id,
    productVariances: state.ui.product.selectedProduct.variances,
    selectedVariance: state.ui.product.selectedVariance,
    productDetailName: state.ui.product.selectedProduct.name,
    productDetailWeight: state.ui.product.selectedProduct.weight,
    productDetailPrice: state.ui.product.selectedProduct.price,
    productDetailDescription: state.ui.product.selectedProduct.short_desc,
    selectedProductId: getSelectedPrductID(state),
    showProductDetails: getShowProductDetails(state),
    temporaryAttribute: state.ui.categories.temporaryAttribute,
    progress: getProgress(state),
    featured: (state.featuredProducts.indexOf(state.ui.product.selectedProduct.id) !== -1),
    selectedProduct: state.ui.product.selectedProduct,
    featuredID: getSelectedFeturedPrductID(state),
    showDone: getShowDone(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleFieldSelect: (type, id, subID) => {
      switch(type) {
        case 'CATEGORY':
          dispatch(categoryActions.categories.ui.set.category(id));

          dispatch(productActions.products.ui.reset.subCategories());

          dispatch(productActions.products.ui.reset.subSubCategories());

          dispatch(productActions.products.ui.set.add.subCategory(''));

          dispatch(productActions.products.ui.set.add.subSubCategory(''));

          dispatch(getSubCategory(id));
          break;
        case 'SUB_CATEGORY':
          dispatch(categoryActions.categories.ui.set.subCategory(id));

          dispatch(productActions.products.ui.reset.subSubCategories());

          dispatch(productActions.products.ui.set.add.subSubCategory(''));

          dispatch(getSubSubCategory(id, subID));
          break;
        case 'SUB_SUB_CATEGORY':
          dispatch(categoryActions.categories.ui.set.subSubCategory(id));

          dispatch({type: 'RESET_UI_PRODUCT_ADD_VALUES'});
          break;
        default:
      }
    },
    handleCategoryObj: obj => {
      dispatch(categoryActions.categories.ui.set.attr.primary({
          attributes: obj.primary_attr,
        }));
      dispatch(categoryActions.categories.ui.set.attr.secondary({
          attributes: obj.secondary_attr,
        }));
    },
    handleSelect: (key, id) => {
        dispatch(categoryActions.categories.ui.set.attr.selected({ id: key }));

        if (key === -1) {
          dispatch(categoryActions.categories.ui.unsetPrimaryAttr({ id }));
        }
    },
    handleAttributeSelect: (selected, id) => {
      dispatch(categoryActions.categories.ui.set.attr.selectSecondary({ selected, id }));
    },
    handleRadio: value => {
      dispatch(sidebarActions.sidebar.ui.set.radioValue(value));
    },
    handleStockUpdate: (type, value, id, key) => {
      switch(type){
        case 'VALUE':
          dispatch(categoryActions.categories.ui.update.stock({
              value,
              id,
              key,
            }));
          break;
        case 'INC':
          dispatch(categoryActions.categories.ui.update.stockInc({
              id,
              key,
            }));
          break;
        case 'DEC':
          dispatch(categoryActions.categories.ui.update.stockDec({
              id,
              key,
            }));
          break;
        default:
          break;
      }
    },
    setAttributeDone: id => {
      dispatch(categoryActions.categories.ui.set.attr.selectPrimary({ id }));

      dispatch(categoryActions.categories.ui.set.attr.selected({ id: -1 }));
    },
    handleStockInputBlur: id => {
      dispatch(categoryActions.categories.ui.validateStock({
          id
        }));
    },
    handleShowRoute: type => {
      switch(type){
        case 'ADD_IMAGES':
          dispatch(sidebarActions.sidebar.show.addProductImages())
          break;
        case 'ADD_PRODUCTS':
          dispatch(sidebarActions.sidebar.show.addProduct())
          break;
        case 'UPLOADING':
          dispatch(sidebarActions.sidebar.show.addProductUploading());
          break;
        default:
         break;
      }
    },
    handleFiles: (id, oldFiles, newFiles, name, shop, token) => {
      dispatch(categoryActions.categories.ui.set.productImages({
          id,
          files: newFiles,
        }));

      dispatch(productActions.products.ui.set.upload.count(oldFiles.length + newFiles.length));

      // const [
      //   first,
      //   ...rest
      // ] = newFiles;

      // const toPost = [
      //   (oldFiles.length === 0) ? 'EDITED' : first,
      //   ...rest
      // ];

      // toPost.forEach(
      newFiles.forEach(
        (file, key) => {
          // if (file === 'EDITED') {
          //   dispatch(imageUploaderActions.imageUploader.show.uploaderEditor({ file: first, id }));
          // } else {
          //   if( key === (newFiles.lenght - 1)) {
          //     dispatch(
          //       postImage(
          //         token,
          //         shop,
          //         { file, tag: `${file.name.toLowerCase().split(' ').join('_')}_${key}` },
          //         id,
          //         (key + oldFiles.length),
          //         'DONE'
          //       )
          //     )
          //   } else {
              dispatch(
                postImage(
                  token,
                  shop,
                  { file, tag: `${file.name.toLowerCase().split(' ').join('_')}_${key}` },
                  id,
                  (key + oldFiles.length),
                  'NEXT'
                )
              )
            // }
          // }
        }
      )
    },
    handleRemoveImg: (id, key) => {
      dispatch(categoryActions.categories.remove.productImage({
          id,
          key,
        }));
      dispatch(productActions.products.ui.set.upload.dec());
    },
    handleManualInput: (uiType, fieldType, value) => {

      dispatch(productActions.products.ui.set[uiType][fieldType](value));

      if(value === '') {
        switch(fieldType) {
          case 'category':
            dispatch(productActions.products.ui.reset.categories());
            break;
          case 'subCategory':
            dispatch(productActions.products.ui.reset.subCategories());
            break;
          case 'subSubCategory':
            dispatch(productActions.products.ui.reset.subSubCategories());
            break;
          default:
            break;

        }
      }
    },
    handleSaveProduct: (obj, shop, token) => {
      dispatch(saveProduct(obj, shop, token));

      dispatch(sidebarActions.sidebar.hide());
    },
    handleSelectVariance: key => {
      dispatch(productActions.products.ui.set.variance(key));
    },
    deleteProduct: id => {
      dispatch({
        type: 'DELETE_PRODUTCT_SELECTED',
        payload: id,
      })
    },
    handleAddVairace: category => {
      dispatch(categoryActions.categories.ui.addPrimaryAttribute(category));
    },
    handleSetTemporaryAttribute: (type, value, attributes) => {
      switch(type){
        case 'KEY':
          dispatch(categoryActions.categories.ui.set.attr.temp.key(value));
          break;
        case 'VALUE':
          dispatch(categoryActions.categories.ui.set.attr.temp.value(value));
          break;
        case 'STOCK':
          dispatch(categoryActions.categories.ui.set.attr.temp.stock(value));
          break;
        case 'ADD':
          if( attributes.key !== '' && attributes.value !== '') {
            dispatch(categoryActions.categories.ui.set.attr.temp.attribute(value));
          }
          break;
        default:
          break;
      }
    },
    deleteSelectedProduct: (id, shop, token) => {
      dispatch(deleteProduct(id, shop, token));
    },
    makeProduct: (product, token) => {
      let customPrimary = false;
      let customSecondary = false;

      product.variances.forEach(
        (primaryObj, primaryKey) => {

          if(primaryObj.custom) {
            customPrimary = true;

            const primaryProgress = ((product.variances.length - 1) === primaryKey) ? 'DONE_PRIMARY' : 'PRIMARY_ONGOING';

            dispatch(requestAttribute(
              token,
              primaryObj.key,
              primaryObj.value,
              primaryObj.type,
              true,
              null,
              primaryProgress,
            ));
          }

          primaryObj.attributes.forEach(
            (secondaryObj, secondaryKey) => {

              if(secondaryObj.custom) {
                customSecondary = true;

                const secondaryProgress = ((primaryObj.attributes.length - 1) === secondaryKey) ? 'DONE_SECONDARY' : 'SECONDARY_ONGOING';

                // if(primaryKey === (product.variances.lenght-1) && secondaryKey === (primaryObj.attributes.lenght-1)) {
                  dispatch(requestAttribute(
                    token,
                    secondaryObj.key,
                    secondaryObj.value,
                    secondaryObj.type,
                    false,
                    primaryObj.type,
                    secondaryProgress
                  ));
                // }
              }

            }
          )
        }
      )

      dispatch(requestAttribute(
                    null,
                    null,
                    null,
                    null,
                    false,
                    null,
                    'DONE_ALL',
                    customPrimary,
                    customSecondary
                  ));
    },
    makeFeaturedProduct: (id, shop, token) => {
      dispatch(makeFeaturedProduct(id, shop, token));
    },
    deleteFromFeaturedProduct: (id, featuredID, shop, token) => {
      dispatch(removeFromFeaturedProduct(id, featuredID, shop, token));
    }
  }
}

const ProductsSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsSidebar);

export default ProductsSidebarContainer;
