import React from 'react';

import ImageGallery from 'react-image-gallery';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Sticky from 'react-sticky-el';

import ProductDetailsMain from './ProductDetailsMain';
import Stars from '../Stars';

import 'react-image-gallery/styles/css/image-gallery.css';
import './ProductDetails.css';

const ProductDetails = ({
  toggleDetails,
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
}) => {

  const images = product.variances[product.selectedVariant].images.map(
    ({ image }) => ({
      original: image,
      thumbnail: image,
    })
  )

  return (
    <div className="product-details-container">
      <IconButton icon="close"
                  className="ProductDetails--toggle"
                  onClick={ () => toggleDetails(null) }
        />

      <div className="product-details-left">
        <Sticky stickyClassName="product-details-info-sticky">
          <h1 className="product-details-title">{ product.name }</h1>
          <div className="product-details-price-title">
            <h2 className="product-details-price">Price: &#2547; { product.price }</h2>
            <Stars rating={ 3 } />
          </div>
        </Sticky>
        <div className="product-details-slider">
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
            showNav={false}
          />
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
                                  deleteFromFeaturedProduct={ deleteFromFeaturedProduct } />
            </small>
          </Tab>
          <Tab label='Specifications'><small>Product Specifications Not Available</small></Tab>
        </Tabs>
      </div>

    </div>
  );

}

export default ProductDetails;
