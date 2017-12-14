import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import Button from 'react-toolbox/lib/button/Button';

import addProductIcon from '../../assets/images/upload-new-product-icon.svg';

import Stars from '../Stars';
import VendorProductCard from './VendorProductCard';
import ProductCardOverlay from './ProductCardOverlay';

import './ProductCard.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: 0,
      selectedVariant: null,
      slectedAttribute: null,
      selectVariant: false,
      selectAttribute: false,
      height: 300,
      width: 200,
    }
  }

  render() {
    const {
      rating = '0',
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
      sh_price = '10000',
    } = this.props;

    sh_price = Math.round(sh_price)

    if (variances) {
      productImages = variances[selectedVariant].images;
    }

    if (vendor && addProductCard) {
      return (
       <VendorProductCard id={ id }
                          handleShowVendorDetails={ handleShowVendorDetails }
                          addProductIcon={ addProductIcon } />
      );
    }

    const buttonClass = classnames('ProductCard-button--base', {
      'ProductCard-button': !this.state.selectAttribute && !this.state.selectVariant,
      'ProductCard-button--diabled': this.state.selectAttribute || this.state.selectVariant
    });

    return (
      <Card className="ProductCard"
        ref={ card => {
          /*{this.props.setWrappedInstance(input.getWrappedInstance());}*/
          this.cardInstance = card;
        }}>
        <Link to={`/product/${id}.${selectedVariant}.${selectedAttribute}/?slug`} replace>
          <div onClick={() => handleShowCustomerDetails(id)}>
            <div className="ProductCard-images">
              <CardMedia aspectRatio="square"
                image={productImages[this.state.selectedImage].image} />
            </div>
            <div className="ProductCard-price">
              {/*<img className="price-tag" src={PriceTag} alt="Price Tag" width="50" height="50"/>*/}
              <div className="price-tag"  >
                <h2 className="product-price">
                  &#2547; {sh_price}
                </h2>
              </div>
            </div>
            <div className="ProductCard-details">
              <h3 className="ProductCard-details-name" title={name}>{name}</h3>
              <div className="ProductCard-details-stars">
                <Stars rating={rating} />
              </div>
            </div>
          </div>
        </Link>
        {
          vendor ?
            <Button className='ProductCard-button-vendor'
              disable
              raised
              label='Edit Product'
              onClick={() => handleShowVendorDetails(id)} /> :
            <Button className={ buttonClass }
              disabled={ this.state.selectAttribute || this.state.selectVariant }
              raised
              label='Add to Cart'
              onClick={
                () => {
                  if (!this.state.selectedVariant && !this.state.selectedAttribute) {
                    this.setState({
                      selectVariant: true,
                    });
                  }
                  // addToCart(
                  //   variances[selectedVariant].attributes[selectedAttribute].id,
                  //   token,
                  //   id
                  // );
                }
              } />
        }
        {
          this.state.selectVariant &&
            <ProductCardOverlay items={
                variances.map(
                    (variant, id) => ({
                      id,
                      color: (variant.type.name === 'Color') ? variant.type.value.toLowerCase() : null,
                      img: (variant.type.name === 'Color') ? null : variant.images[0].image
                    })
                )
              }
              handleSelected={
                id => {
                  if (!this.state.selectedVariant && !this.state.selectedAttribute) {
                    this.setState({
                      selectedVariant: id,
                      selectVariant: false,
                      selectAttribute: true,
                    });
                  }

                  if (this.state.selectedVariant && !this.state.selectedAttribute) {
                    this.setState({
                      selectedAttribute: id,
                    });
                  }
                }
              } />
        }
        {
          this.state.selectVariant &&
            <ProductCardOverlay title="Choose Color/Variant" type="variant"
              items={
                variances.map(
                    (variant, id) => ({
                      id,
                      color: (variant.type.name === 'Color') ? variant.type.value.toLowerCase() : null,
                      img: (variant.type.name === 'Color') ? null : variant.images[0].image,
                      name: variant.type.value
                    })
                )
              }
              handleSelected={
                id => {
                  if (!this.state.selectedVariant && !this.state.selectedAttribute) {
                    this.setState({
                      selectedVariant: id,
                      selectVariant: false,
                      selectAttribute: true,
                    });
                  }

                  if (this.state.selectedVariant && !this.state.selectedAttribute) {
                    this.setState({
                      selectedAttribute: id,
                    });
                  }
                }
              } />
        }
      </Card>
    );
  }
}

export default ProductCard;
