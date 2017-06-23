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
  showInfo
}) => {

  const infoClass = classNames('ProductsSidebar-add--products--info', {
    'ProductsSidebar-add--products--info--show': showInfo,
  });

  return (
    <div className="ProductSidebar-details">
                <div className="ProductSidebar-details--images">
                  {
                    (productVariances[selectedVariance].images.length > 0) &&
                      <Slider dots lazyLoad={ false }>
                        {
                          productVariances[selectedVariance].images.map(
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
                      ({ type }, key) => <IconButton  icon={
                                                        (selectedVariance === key) ?
                                                        'done' :
                                                        <span />
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
                        Charged to customer: { productDetailfcomPrice } &#2547;
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
                <EditVariance product={ selectedProduct }
                              variant={ selectedVariance } />
                {
                      featured ?
                        <Button icon="star_border"
                              label="Remove featured product"
                              accent
                              onClick={
                                () => deleteFromFeaturedProduct(selectedProductId, featuredID, shop, token)
                              } /> :
                        <Button icon="start"
                              label="Add to featured product"
                              primary
                              onClick={
                                () => makeFeaturedProduct(selectedProductId, shop, token)
                              } />

                }

                <div className="ProductsSidebar-add-actions">
                    <Button icon="delete"
                            label="Delete"
                            accent
                            onClick={
                              () => deleteSelectedProduct(selectedProductId, shop, token)
                            } />
                    <Button icon="save"
                            label="save"
                            onClick={
                              () => handleSaveProduct(selectedProduct, shop, token, true)
                            } />
                  </div>
              </div>
  )
}

export default AddProductDetails;
