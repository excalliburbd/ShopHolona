import React, { Component } from 'react';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import Button from 'react-toolbox/lib/button/Button';

import addProductIcon from '../../assets/svg/add-product.svg';

import Stars from '../Stars';

import './ProductCard.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: 0,
    }

    this.getRandomInt = this.getRandomInt.bind(this);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const {
      rating = this.getRandomInt(3, 5),
      name = 'Product Name',
      handleShowVendorDetails,
      handleShowCustomerDetails,
      variances,
      id,
      vendor,
      addProductCard,
      addToCart,
      selectedVariant,
      selectedAttribute,
      token,
    } = this.props;

    let {
      productImages = ['https://unsplash.it/480/480'],
      price = '10000',
    } = this.props;

    price = Math.round(price)

    if (variances) {
      productImages = variances[selectedVariant].images;
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
          <div className="ProductCard-images">
            <CardMedia aspectRatio="square"
                     image={ productImages[this.state.selectedImage].image } />
            <div className="ProductCard-images--select">
              {
              variances.forEach(
                (variant, key) => {
                  {/*let style = {};

                  if (variant.type.name === 'Color') {
                    style = {
                      background: variant.type.value.toLowerCase()
                    }
                  } else {
                    if ( variant.images[0] ) {
                      style = {
                        backgroundImage: variant.images[0].image
                      }
                    } else {
                      style = {
                        backgroundImage: '#ccc'
                      }
                    }
                  }*/}

                  {/*return <div className="ProductCard-images--select--circle"
                              onClick={ event => {
                                event.stopPropagation();
                                setVariant(id, key);
                              }}
                              style={ style }
                              key={ key } />*/}
                }
              )
            }
            </div>
          </div>
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
            </div>
          </div>


        </div>
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
                      () => addToCart(
                        variances[selectedVariant].attributes[selectedAttribute].id,
                        token,
                        id
                      )
                    }/>
        }
      </Card>
    );
  }
}

export default ProductCard;
