import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';

import Slider from 'react-slick';

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
}) => {
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
                    <Button icon="photo_camera"
                        label="Edit product images"
                        onClick={
                          () => handleShowRoute('ADD_IMAGES', 'edit')
                        } />
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
