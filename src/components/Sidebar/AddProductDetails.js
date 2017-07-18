import React from 'react';
import classNames from 'classnames';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';

import Slider from 'react-slick';

import EditVariance from './EditVariance';

const AddProductDetails = ({
  handleManualInput,
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
  featured,
  makeFeaturedProduct,
  deleteFromFeaturedProduct,
  selectedProduct,
  featuredID,
  handleShowRoute,
  fcom,
  productDetailfcomPrice,
  togglePricingInfo,
  showInfo,
  handleStockEdit,
  demostore,
}) => {

  const infoClass = classNames('ProductsSidebar-add--products--info', {
    'ProductsSidebar-add--products--info--show': showInfo,
  });

  return (
    <div className="ProductSidebar-details">
                <div className="ProductSidebar-details--images">
                  {
                    (productVariances[(selectedVariance === -1) ? 0 : selectedVariance].images.length > 0) &&
                      <Slider dots lazyLoad={ false }>
                        {
                          productVariances[(selectedVariance === -1) ? 0 : selectedVariance].images.map(
                            ({image, alt_tag}) => <div>
                                                    <img src={ image } alt={ alt_tag } />
                                                  </div>
                          )
                        }
                      </Slider>
                  }
                </div>
                <div className="ProductSidebar-details--variance">
                  {
                    productVariances.map(
                      ({ type, attributes }, key) => <IconButton  icon={
                                                        <span>{`${ attributes.reduce( (acc, curr) => {
                                                                      if (curr.stock !== '') {
                                                                        return parseInt(curr.stock, 10) + acc;
                                                                      }

                                                                      return 0 + acc;
                                                                    }, 0) }`}</span>
                                                      }
                                                      onClick={
                                                        () => handleSelectVariance(key)
                                                      }
                                                      style={{
                                                        background: (type.value) ?
                                                                    type.value.toLowerCase() : null
                                                      }}
                                                      key={ type.id }
                                                      className="ProductsSidebar-add--color" />
                    )
                  }
                </div>
                {
                  (selectedVariance !== -1) && <EditVariance  product={ selectedProduct }
                                                              variant={ selectedVariance }
                                                              handleStockEdit={ handleStockEdit }
                                                              handleSelectVariance={ handleSelectVariance } />
                }
                <Button icon="photo_camera"
                        label="Edit product images"
                        onClick={
                          () => handleShowRoute('ADD_IMAGES', 'edit')
                        } />
                <div className="ProductSidebar-details--details">
                  <Input  label="Name"
                          onChange={ value => handleManualInput('edit', 'name', value) }
                          value={ productDetailName } />
                  <Input  label="Weight"
                          type="number"
                          onChange={ value => handleManualInput('edit', 'weight', value) }
                          value={ Math.round(productDetailWeight) } />
                  <Input  label="Price"
                          type="number"
                          onChange={ value => handleManualInput('edit', 'price', value) }
                          value={ Math.round(productDetailPrice) } />
                  { fcom &&
                      <p className="ProductSidebar-details--commission">
                        Actual Price: { productDetailfcomPrice } &#2547;
                        <IconButton icon="info_outline"
                                    onClick={ togglePricingInfo } />
                      </p>
                  }
                  <div className={ infoClass }>
                    <p>We charge a minimum commission per product for insurance and so that you don't lose the competitive edge:</p>
                    <ul>
                      <li>BDT 1 - BDT 999 : 8%</li>
                      <li>BDT 1000 - BDT 4999 : 6%</li>
                      <li>BDT 5000 - BDT 9,999 : 4%</li>
                      <li>BDT 10,000 - BDT 19,999 : 2%</li>
                      <li>BDT 20,000+ : 1%</li>
                    </ul>
                  </div>
                  <Input  label="Description"
                          onChange={ value => handleManualInput('edit', 'desc', value) }
                          value={ productDetailDescription } />
                </div>
                {
                      featured ?
                        <Button icon="star_border"
                              label="Remove featured product"
                              accent
                              onClick={
                                () => deleteFromFeaturedProduct(selectedProductId, featuredID, shop, token, shop === demostore)
                              } /> :
                        <Button icon="start"
                              label="Add to featured product"
                              primary
                              onClick={
                                () => makeFeaturedProduct(selectedProductId, shop, token, shop === demostore)
                              } />

                }

                <div className="ProductsSidebar-add-actions">
                    <Button icon="delete"
                            label="Delete"
                            accent
                            onClick={
                              () => deleteSelectedProduct(selectedProductId, shop, token, shop === demostore)
                            } />
                    <Button icon="save"
                            label="save"
                            onClick={
                              () => handleSaveProduct(selectedProduct, shop, token, true, shop === demostore)
                            } />
                  </div>
              </div>
  )
}

export default AddProductDetails;
