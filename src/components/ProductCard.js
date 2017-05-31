import React from 'react';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import Button from 'react-toolbox/lib/button/Button';

import addProductIcon from '../assets/svg/add-product.svg';
import Stars from './Stars';

import './ProductCard.css';

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
  handleShowDetails,
  variances,
  id,
  vendor,
  featureCard,
  addProductCard,
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
      <Button className={ vendor ? 'ProductCard-button-vendor' : 'ProductCard-button' } raised label={ vendor ? 'Edit Product' : 'Add to Cart' } />
    </Card>
  )
}

export default ProductCard;

