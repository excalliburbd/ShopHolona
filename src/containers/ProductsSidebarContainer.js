import { connect } from 'react-redux';

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

import {
  sidebarActions,
  productActions,
  categoryActions,
  serviceActions,
  imageUploaderActions
} from '../actions/';

import ProductsSidebar from '../components/Sidebar/ProductsSidebar';

import {
  getPrimaryAttributes,
  getSecondaryAttributes,
  getProductCategory,
  getProductSubCategory,
  getProductSubSubCategory,
  getProductName,
  getProductWeight,
  getProductPrice,
  getProductDescription,
  getCategoryID,
  getSubCategoryID,
  getRadioValue,
  getProgress,
  getSelectedProductID,
  getFusedCategories,
  getFusedSubCategories,
  getFusedSubSubCategories,
  getShowAddColors,
  getShowAddVariances,
  getShowAddImages,
  getFinishedProduct,
  getShowProductDetails,
  getSelectedFeturedPrductID,
  getShowDone,
  getFcomPrice,
  getProductDetailfcomPrice,
} from '../selectors/productSelectors';

import {
  getIsFcom
} from '../selectors/shopSelectors';

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
    fcomPrice: getFcomPrice(state),
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
    selectedProductId: getSelectedProductID(state),
    showProductDetails: getShowProductDetails(state),
    temporaryAttribute: state.ui.categories.temporaryAttribute,
    progress: getProgress(state),
    featured: (state.featuredProducts.indexOf(state.ui.product.selectedProduct.id) !== -1),
    selectedProduct: state.ui.product.selectedProduct,
    featuredID: getSelectedFeturedPrductID(state),
    showDone: getShowDone(state),
    showServiceDetails: getShowProductDetails(state),
    serviceTitle: state.ui.service.title,
    serviceFee: state.ui.service.name,
    serviceDescription: state.ui.service.desc,
    showAddVariances: getShowAddVariances(state),
    isFcom: getIsFcom(state),
    productDetailfcomPrice: getProductDetailfcomPrice(state),
    showInfo: state.ui.product.pricingInfo,
    demostore: state.shop.demostore,
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
    handleAttributeSelect: (selected, id, stock) => {
      if (selected) {
        if (parseInt(stock, 10) > 0) {
          dispatch(categoryActions.categories.ui.update.stock({
            value: '0',
            id,
            key: selected[0],
          }));
        } else {
          dispatch(categoryActions.categories.ui.update.stock({
            value: '1',
            id,
            key: selected[0],
          }));
        }
      }
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
    handleShowRoute: (type, ui) => {
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
        case 'EDITING':
          dispatch(sidebarActions.sidebar.show.addProductDetails(ui));
          break;
        case 'BACK_TO_EDITING':
          dispatch(sidebarActions.sidebar.show.backToProductDetails(ui));
          break;
        default:
         break;
      }
    },
    handleFiles: (id, oldFiles, newFiles, name, shop, token, editing) => {
      if (editing) {
        newFiles.forEach(
          (file, key) => {
              dispatch(
                postImage(
                  token,
                  shop,
                  { file, tag: `${file.name.toLowerCase().split(' ').join('_')}_${key}` },
                  id,
                  (key + oldFiles.length),
                  'EDIT'
                )
              )
          }
        )
      } else {
        dispatch(categoryActions.categories.ui.set.productImages({
            id,
            files: newFiles,
          }));

        dispatch(
          imageUploaderActions.imageUploader.upload.count(newFiles.length)
        );

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
      }
    },
    handleRemoveImg: (id, key, editing) => {
      if (editing) {
        dispatch(productActions.products.ui.set.delete.image({variantKey: id, imageKey: key}));
      } else {
        dispatch(categoryActions.categories.remove.productImage({
            id,
            key,
          }));
        dispatch(imageUploaderActions.imageUploader.upload.dec());
      }
    },
    handleManualInput: (uiType, fieldType, value) => {
      if(uiType === 'add') {
        dispatch(productActions.products.ui.set[uiType][fieldType](value));
      }

      if(uiType === 'service') {
        dispatch(serviceActions.services.ui.set.add[fieldType](value));
      }

      if (uiType === 'edit') {
        dispatch(productActions.products.ui.set[uiType][fieldType](value))
      }

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
    handleSaveProduct: (obj, shop, token, editing, demostore) => {
      if (editing) {
        dispatch(saveProduct(obj, shop, token, editing, demostore));
      } else {
        dispatch(saveProduct(obj, shop, token, editing, demostore));

        dispatch(sidebarActions.sidebar.hide());
      }
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
    },
    togglePricingInfo: () => {
      dispatch(productActions.products.ui.toggle.info());
    },
    handleStockEdit: (variantKey, attributeKey, value) => {
      dispatch(productActions.products.ui.set.edit.stock({variantKey, attributeKey, value}))
    }
  }
}

const ProductsSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsSidebar);

export default ProductsSidebarContainer;
