import React from 'react';

import AddProductService from './AddProductService';
import AddProductImages from './AddProductImages';
import AddProductDetails from './AddProductDetails';
import ProductUpload from './ProductUpload';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './ProductsSidebar.css';

const ProductsSidebar = ({
  type,
  handleFieldSelect,
  categories,
  subCategories,
  subSubCategories,
  categoryID,
  subCategoryID,
  handleCategoryObj,
  primaryAttributes,
  secondaryAttributes,
  handleSelect,
  handleAttributeSelect,
  radioValue,
  handleRadio,
  handleStockUpdate,
  selectedAttribute,
  setAttributeDone,
  showAddColors,
  showAddImages,
  handleStockInputBlur,
  handleShowRoute,
  handleFiles,
  handleRemoveImg,
  productCategory,
  productSubCategory,
  productSubSubCategory,
  productName,
  productWeight,
  productPrice,
  productDescription,
  handleManualInput,
  finishedProduct,
  handleSaveProduct,
  token,
  shop,
  productVariances,
  selectedVariance,
  productDetailName,
  productDetailWeight,
  productDetailPrice,
  productDetailDescription,
  handleSelectVariance,
  selectedProductId,
  deleteSelectedProduct,
  showProductDetails,
  handleAddVairace,
  temporaryAttribute,
  handleSetTemporaryAttribute,
  makeProduct,
  progress,
  featured,
  makeFeaturedProduct,
  deleteFromFeaturedProduct,
  selectedProduct,
  featuredID,
  showDone,
}) => {
  switch(type) {
    case 'ADD_PRODUCT':
    case 'ADD_SERVICE':
      return <AddProductService   handleFieldSelect={ handleFieldSelect }
                                  categories={ categories }
                                  subCategories={ subCategories }
                                  subSubCategories={ subSubCategories }
                                  categoryID={ categoryID }
                                  handleCategoryObj={ handleCategoryObj }
                                  primaryAttributes={ primaryAttributes }
                                  secondaryAttributes={ secondaryAttributes }
                                  handleSelect={ handleSelect }
                                  handleAttributeSelect={ handleAttributeSelect }
                                  radioValue={ radioValue }
                                  handleRadio={ handleRadio }
                                  handleStockUpdate={ handleStockUpdate }
                                  selectedAttribute={ selectedAttribute }
                                  setAttributeDone={ setAttributeDone }
                                  showAddColors={ showAddColors }
                                  showAddImages={ showAddImages }
                                  handleStockInputBlur={ handleStockInputBlur }
                                  handleShowRoute={ handleShowRoute }
                                  productCategory={ productCategory }
                                  productSubCategory={ productSubCategory }
                                  productSubSubCategory={ productSubSubCategory }
                                  productName={ productName }
                                  productWeight={ productWeight }
                                  productPrice={ productPrice }
                                  productDescription={ productDescription }
                                  handleManualInput={ handleManualInput }
                                  showProductDetails={ showProductDetails }
                                  handleAddVairace={ handleAddVairace }
                                  temporaryAttribute={ temporaryAttribute }
                                  handleSetTemporaryAttribute={ handleSetTemporaryAttribute } />
    case 'ADD_PRODUCT_IMAGES':
      return <AddProductImages  primaryAttributes={ primaryAttributes }
                                handleShowRoute={ handleShowRoute }
                                handleFiles={ handleFiles }
                                handleRemoveImg={ handleRemoveImg }
                                productName={ productName }
                                token={ token }
                                shop={ shop }
                                showDone={ showDone } />
    case 'SHOW_PRODUCT_DETAILS':
      return <AddProductDetails   handleManualInput={ handleManualInput }
                                  finishedProduct={ finishedProduct }
                                  handleSaveProduct={ handleSaveProduct }
                                  token={ token }
                                  shop={ shop }
                                  productVariances={ productVariances }
                                  selectedVariance={ selectedVariance }
                                  productDetailName={ productDetailName }
                                  productDetailWeight={ productDetailWeight }
                                  productDetailPrice={ productDetailPrice }
                                  productDetailDescription={ productDetailDescription }
                                  handleSelectVariance={ handleSelectVariance }
                                  selectedProductId={ selectedProductId }
                                  deleteSelectedProduct={ deleteSelectedProduct }
                                  featured={ featured }
                                  makeFeaturedProduct={ makeFeaturedProduct }
                                  deleteFromFeaturedProduct={ deleteFromFeaturedProduct }
                                  selectedProduct={ selectedProduct }
                                  featuredID={ featuredID } />
    case 'UPLOADING':
      return <ProductUpload className="ProductSidebar-upload"
                            makeProduct={ makeProduct }
                            product={finishedProduct}
                            shop={ shop }
                            token={token}
                            saveProduct={ handleSaveProduct }
                            progress={ progress } />
    default:
      return <div className="ProductsSidebar-empty"/>
  }
}

export default ProductsSidebar;
