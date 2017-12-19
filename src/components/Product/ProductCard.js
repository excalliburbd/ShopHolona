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
import ProductCardOverlayAttribute from './ProductCardOverlayAttribute';

import './ProductCard.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: 0,
      selectedVariant: null,
      selectedAttribute: null,
      selectVariant: false,
      selectAttribute: false,
      showAddToCart: false,
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

    const buttonClass = `ProductCard-button ${ (this.state.selectVariant || this.state.selectAttribute ) ? this.state.showAddToCart ? '' : 'ProductCard-button--disabled' : '' }`;

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
              raised
              label='Add to Cart'
              disabled={(this.state.selectVariant || this.state.selectAttribute) && (!this.state.showAddToCart)}
              onClick={
                () => {
                  if (!this.state.selectedVariant && !this.state.selectedAttribute) {
                    this.setState({
                      selectVariant: true,
                    });
                  } else {
                    addToCart(
                      variances[parseInt(this.state.selectedVariant, 10)].attributes[parseInt(this.state.selectedAttribute, 10)].id,
                      token,
                      id,
                      this.setState({
                        selectedImage: 0,
                        selectedVariant: null,
                        selectedAttribute: null,
                        selectVariant: false,
                        selectAttribute: false,
                        disableButton: false,
                      })//TODO first? the chicken or the egg ;)
                    );
                  }
                }
              } />
        }
        {
          this.state.selectVariant &&
            <ProductCardOverlay
              items={
                variances.map(
                    (variant, id) => ({
                      id: `${id}`,
                      img: variant.images[0].image,
                      name: variant.type.value
                    })
                )
              }
              handleGoBack={
                () => {
                  this.setState({
                    selectVariant: false,
                  });
                }
              }
              handleSelected={
                id => {
                  this.setState({
                    selectedVariant: id,
                    selectVariant: false,
                    selectAttribute: true,
                  });
                }
              } />
        }
        {
          this.state.selectAttribute &&
            <ProductCardOverlayAttribute
              items={
                variances[this.state.selectedVariant || selectedVariant].attributes.map(
                    (attribute, id) => ({
                      id: `${id}`,
                      value: attribute.type.value
                    })
                )
              }
              selectedAttribute={this.state.selectedAttribute}
              handleGoBack={
                () => {
                  this.setState({
                    selectedVariant: null,
                    selectVariant: true,
                    selectAttribute: false,
                    showAddToCart: false,
                  })
                }
              }
              handleSelected={
                id => {
                  this.setState({
                    selectedAttribute: id,
                    showAddToCart: true,
                  });
                }
              } />
        }
      </Card>
    );
  }
}

export default ProductCard;
