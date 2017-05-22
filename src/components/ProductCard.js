import React from 'react';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import Menu from 'react-toolbox/lib/menu/Menu';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Chip from 'react-toolbox/lib/chip';

import Taka from '../assets/images/taka.png';
import Stars from './Stars';

import './ProductCard.css';

import featureCardImg from './featuredProducts.png';
import productCardImg from './addProduct.png';

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
}) => {
  if(variances && variances[0].images[0]){
    productImg = variances[0].images[0].image
  }

  let img = productImg;;

  if(vendor && featureCard) {
    img = featureCardImg;
    name = 'Add Featured Product';
  }

  if(vendor && addProductCard) {
    img = productCardImg;
    name = 'Add Product';
  }

  return (
    <Card className="ProductCard" onClick={ () => handleShowDetails(id) }>
      <CardMedia aspectRatio="square"
                  image={ img } />
      {
        (!vendor && !addProductCard && !featureCard) &&
        <div className="ProductCard-price">
          {/*<img className="price-tag" src={PriceTag} alt="Price Tag" width="50" height="50"/>*/}
          <div className="price-tag">
            <h2 className="product-price">
            <img className="price-symbol" src={Taka} alt="BDT"/>
            { price }</h2>
          </div>
        </div>
      }
      <div className="ProductCard-details">
        <h3 className="ProductCard-details-name">{ name }</h3>
        { (!vendor && !addProductCard && !featureCard) && <Stars rating={ rating } /> }
      </div>
      {
        (!vendor && !addProductCard && !featureCard) &&
        <Button className="ProductCard-button" raised label={ vendor ? 'Edit Product' : 'Add to Cart' } />
      }
    </Card>
  )
}

export default ProductCard;
