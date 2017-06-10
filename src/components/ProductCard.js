import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from "uuid"
import Card from 'react-toolbox/lib/card/Card'
import CardMedia from 'react-toolbox/lib/card/CardMedia'
import Button from 'react-toolbox/lib/button/Button'
import Dialog from 'react-toolbox/lib/dialog/Dialog'

import addProductIcon from '../assets/svg/add-product.svg'
import ProductDetails from './ProductDetails'

import Stars from './Stars'

import './ProductCard.css'

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const ProductCard = ({
  rating = getRandomInt(3, 5),
  productImg = 'https://unsplash.it/480/480',
  name = 'Product Name',
  price = '10000',
  handleShowVendorDetails,
  handleShowCustomerDetails,
  variances,
  id,
  vendor,
  addProductCard,
  addToCart,
}) => {
  price = Math.round(price)

  if(variances && variances[0].images[0]){
    productImg = variances[0].images[0].image
  }

  if (vendor && addProductCard) {
    return (
      <Card className="ProductCard ProductCard--addProduct" onClick={ () => handleShowVendorDetails(id) }>
        <CardMedia aspectRatio="square"/>
        <div className="ProductCard-details ProductCard--addProduct-details">
          <div className="ProductCard--addProduct-details-icon">
            <img className="addicon" src={addProductIcon} alt="Add icon"/>
          </div>
          <h3 className="ProductCard-details-name ProductCard--addProduct-details-content">
            Add A New Product / Service
          </h3>
          <h3 className="ProductCard-details-name ProductCard--addProduct-details-name">
            Add Products
          </h3>
          <div className="ProductCard--addProduct-rating">
            <Stars rating={ 0 } />
          </div>
        </div>
        <Button className="ProductCard--addProduct-button" raised label="Add Products" />
      </Card>
    );
  }

  return (
    <Card className="ProductCard">
      <div onClick={ () => handleShowCustomerDetails(id) }>
        <CardMedia aspectRatio="square"
                    image={ productImg } />
        <div className="ProductCard-price">
          {/*<img className="price-tag" src={PriceTag} alt="Price Tag" width="50" height="50"/>*/}
          <div className="price-tag"  >
            <h2 className="product-price">
              &#2547; { price }
            </h2>
          </div>
        </div>
        <div className="ProductCard-details">
          <h3 className="ProductCard-details-name">{ name }</h3>
          <div className="ProductCard-details-stars">
            <Stars rating={ rating } />
            {/*<h3 className="ProductCard-details-quantity"> Quantity: 3</h3>*/}
          </div>
        </div>
      </div>
      {/*<Button className="ProductCard-button" raised label={ vendor ? 'Edit Product' : 'Add to Cart' } />*/}
      {
        vendor ?
          <Button className='ProductCard-button-vendor'
                  raised
                  label='Edit Product'
                  onClick={ () => handleShowVendorDetails(id) } /> :
          <Button className='ProductCard-button'
                  raised
                  label='Add to Cart'
                  onClick={
                    () => addToCart({
                            id: uuid.v4(),
                            productId: id,
                            varianceParentId: variances[0].id,
                            varianceId: variances[0].attributes[0].id,
                            price: variances[0].attributes[0].price,
                            quantity: 1
                          })
                  }/>
      }
    </Card>
  );
}

export default ProductCard;
