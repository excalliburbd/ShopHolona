import React from 'react';

import ImageGallery from 'react-image-gallery';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Sticky from 'react-sticky-el';
import ReactImageZoom from 'react-image-zoom';

// import ReactZoomify from './ImageZoom';

import ProductDetailsMain from './ProductDetailsMain';
import Stars from '../Stars';

import 'react-image-gallery/styles/css/image-gallery.css';
import './ProductDetails.css';

const ProductDetails = ({
                          toggleDetails,
                          id,
                          variances,
                          selectedVariant,
                          selectedAttribute,
                          product,
                          addToCart,
                          setVariant,
                          tabIndex,
                          tabChange,
                          setAttribute,
                          token,
                          vendor,
                          featured,
                          shop,
                          deleteFromFeaturedProduct,
                          makeFeaturedProduct,
                          featuredID,
                          selectVariance,
                          shopDomain,
                          history,
                          location,
                          match,
                        }) => {

  const images = product.variances[product.selectedVariant].images.map(
    ({ image }) => ({
      original: image,
      thumbnail: image,
    })
  )

  const zoomImg = {
    width: 320,
    offset: {vertical: 0, horizontal: 10},
    zoomWidth: 320,
    img: `${images[0].original}`
  };

  if (location.search === '') {
    history.push(`${match.url}?${variances[selectedVariant].type.value}+${variances[selectedVariant].attributes[selectedAttribute].type.value}`);
  } else if (location.search !== `?${variances[selectedVariant].type.value}+${variances[selectedVariant].attributes[selectedAttribute].type.value}`) {
    history.push(`${match.url}?${variances[selectedVariant].type.value}+${variances[selectedVariant].attributes[selectedAttribute].type.value}`);
  }

  return (
    <div className="product-details-container">
      <IconButton
        title="Back to Store"
        icon="arrow_back"
        className="ProductDetails--toggle"
        onClick={ () => toggleDetails(null) }
      />

      <div className="product-details-left">
        <Sticky stickyClassName="product-details-info-sticky">
          <h1 className="product-details-title">{ product.name }</h1>
          <div className="product-details-price-title">
            <h2 className="product-details-price">Price: &#2547; { product.sh_price }</h2>
            <Stars rating={ 0 } />
          </div>
        </Sticky>

        <div className="product-details-left--img-main">
          <ReactImageZoom {...zoomImg} />
        </div>

        {/*<div className="img-main">*/}
          {/*<ReactZoomify*/}
            {/*width={320}*/}
            {/*src={images[0].original}*/}
            {/*s={100}*/}
            {/*magnification={4}*/}
            {/*zoomedImgLeft={700}*/}
            {/*zoomedImgTop={100}*/}
          {/*/>*/}
        {/*</div>*/}

        <div className="product-details-slider">
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
            showNav={false}
          />
        </div>

        <div className="details-action">
          {
            vendor ?
              (
                featured ?
                  <Button icon="star_border"
                          label="Remove featured product"
                          accent
                          onClick={
                            () => deleteFromFeaturedProduct(id, featuredID, shop, token)
                          } /> :
                  <Button icon="start"
                          label="Add to featured product"
                          primary
                          onClick={
                            () => makeFeaturedProduct(id, shop, token)
                          } />
              ) :
              <Button className="details-action--cart"
                      onClick={
                        () => addToCart(
                          variances[selectedVariant].attributes[selectedAttribute].id,
                          token,
                          id
                        )
                      }
                      label='Add to cart'
                      raised
                      primary />
          }
        </div>

      </div>

      <div className="product-details-right">
        <Tabs className="product-details-tabs" index={ tabIndex } onChange={ tabChange } fixed>
          <Tab label='Details'>
            <small>
              <ProductDetailsMain select={ setVariant }
                                  chooseAttribute={ setAttribute }
                                  token={ token }
                                  { ...product }
                                  addToCart={ addToCart }
                                  vendor={ vendor }
                                  featured={ featured }
                                  shop={ shop }
                                  makeFeaturedProduct={ makeFeaturedProduct }
                                  deleteFromFeaturedProduct={ deleteFromFeaturedProduct }
                                  selectVariance={ selectVariance }
                                  shopDomain={ shopDomain } />
            </small>
          </Tab>
          {/*<Tab label='Specifications'><small>Product Specifications Not Available</small></Tab>*/}
        </Tabs>
      </div>

    </div>
  );

}

export default ProductDetails;
