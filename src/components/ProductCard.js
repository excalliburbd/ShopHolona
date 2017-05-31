import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import Button from 'react-toolbox/lib/button/Button';

import addProductIcon from '../assets/svg/add-product.svg';

import Stars from './Stars';

import './ProductCard.css';

const actionsToState = dispatch => ({
  showCartProducts: () => {
    dispatch({
      type: 'SHOW_SIDEBAR_CART_CHOOSE'
    })
  }
})

const ProductCard = ({
  rating = 3,
  productImg = 'https://unsplash.it/480/480',
  name = 'Product Name',
  price = '10000',
  handleShowDetails,
  variances,
  id,
  vendor,
  featureCard,
  addProductCard,
  showCartProducts
}) => {

  price = Math.round(price);

  if(variances && variances[0].images[0]){
    productImg = variances[0].images[0].image
  }

  if (vendor && addProductCard) {
    return (
      <Card className="ProductCard ProductCard--addProduct" onClick={ () => handleShowDetails(id) }>
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
      )
  }

  return (
    <Card className="ProductCard" onClick={ () => handleShowDetails(id) }>
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
      {/*<Button className="ProductCard-button" raised label={ vendor ? 'Edit Product' : 'Add to Cart' } />*/}
      { vendor ? <Button className='ProductCard-button-vendor' raised label='Edit Product' />
      :
      <Button className='ProductCard-button' raised label='Add to Cart' onClick={showCartProducts}/>
      }
    </Card>
  )
}

export default connect(null, actionsToState)(ProductCard);

