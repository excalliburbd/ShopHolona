import React from 'react';

import AddProductService from './AddProductService';
import AddProductImages from './AddProductImages';
import AddProductDetails from './AddProductDetails';


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
  handleAddVairance,
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
  showAddVariances,
  isFcom,
  fcomPrice,
  productDetailfcomPrice,
  showInfo,
  togglePricingInfo,
  handleStockEdit,
  demostore,
  fusedAttributes,
  rawAttributes,
  doneAllCustomAttr,
}) => {
  switch(type) {
    case 'ADD_PRODUCT':
    case 'ADD_SERVICE':
      return <AddProductService type={type}
                                handleFieldSelect={ handleFieldSelect }
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
                                handleAddVairance={ handleAddVairance }
                                temporaryAttribute={ temporaryAttribute }
                                handleSetTemporaryAttribute={ handleSetTemporaryAttribute }
                                showAddVariances={ showAddVariances }
                                fcom={ isFcom }
                                fcomPrice={ fcomPrice }
                                showInfo={ showInfo }
                                togglePricingInfo={ togglePricingInfo }
                                fusedAttributes={ fusedAttributes }
                                rawAttributes={ rawAttributes } />
    case 'ADD_PRODUCT_IMAGES':
      return <AddProductImages  primaryAttributes={ primaryAttributes }
                                handleShowRoute={ handleShowRoute }
                                handleFiles={ handleFiles }
                                handleRemoveImg={ handleRemoveImg }
                                productName={ productName }
                                token={ token }
                                shop={ shop }
                                showDone={ showDone }
                                selectedProduct={ selectedProduct }
                                saveProduct={ handleSaveProduct }
                                product={ finishedProduct } />
    case 'SHOW_PRODUCT_DETAILS':
      return <AddProductDetails   handleManualInput={ handleManualInput }
                                  handleSaveProduct={handleSaveProduct}
                                  token={ token }
                                  shop={ shop }
                                  handleShowRoute={ handleShowRoute }
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
                                  featuredID={ featuredID }
                                  fcom={ isFcom }
                                  productDetailfcomPrice={ productDetailfcomPrice }
                                  showInfo={ showInfo }
                                  togglePricingInfo={ togglePricingInfo }
                                  handleStockEdit={ handleStockEdit }
                                  demostore={ demostore } />

    default:
      return <div className="ProductsSidebar-empty"/>
  }
}

export default ProductsSidebar;
