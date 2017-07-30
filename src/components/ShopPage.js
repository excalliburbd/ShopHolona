import React from 'react';
import classNames from 'classnames';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Chip from 'react-toolbox/lib/chip/Chip';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import Icon from 'react-icons-kit';
import Input from 'react-toolbox/lib/input/Input';

import ProductCard from './Product/ProductCard';
import ProductDetails from './Product/ProductDetails';
import Stars from './Stars';
import FeaturedSlider from './FeaturedSlider';

import { female } from 'react-icons-kit/ionicons/female';
import { male } from 'react-icons-kit/ionicons/male';

import store1 from '../assets/images/demo_store1.png';
import cover_night from '../assets/images/demo_store_cover_night.png';

import './ShopPage.css'

const ShopPage = ({
  toggleDetails,
  details,
  shopName,
  shortDesc,
  products,
  selectedChip,
  selectChip,
  handleShowProductDetails,
  vendor,
  handleAddProduct,
  featuredProducts,
  handleShowImageUploader,
  profilePic,
  coverPhoto,
  shopPhones,
  shopAddress,
  handleEditContactNumber,
  handleSaveContactNumber,
  handleAddToCart,
  productDetails,
  handleToggleProductDetails,
  selectedProductDetails,
  handleSetVariant,
  handleSetAttribute,
  productDetailstabIndex,
  handleProductDetailsTab,
  token,
  featured,
  shop,
  makeFeaturedProduct,
  deleteFromFeaturedProduct,
  handleSaveDescription,
  handleEditDescription,
  editDesc,
  handleShowEditDescription,
  info,
  following,
  handleFollowShop,
  handlePromptSignIn,
}) => {

  const detailsClass = classNames({
    'ShopPage-details': true,
    'ShopPage-details--show': details,
  });

  const productDetailsClass = classNames( 'ShopPage', {
    'ShopPage-product-details': productDetails,
  });

  const getIcon = name => {
    switch(name) {
      case 'Womens':
        return <Icon icon={ female } />
      case 'Men\'s':
        return <Icon icon={ male } />
      case 'Electronics':
        return <FontIcon value='devices_other' />;
      default:
        break;
    }

    return null;
  }

  products = products.map(
    obj => {
      return {
        ...obj,
        first_parent: {
          ...obj.first_parent,
          icon: getIcon(obj.first_parent.name)
        }
      }
    }
  );

  if (!profilePic || profilePic.split('/').slice(-1)[0] === 'no_images.jpg') {
    profilePic = store1
  }

  if (!coverPhoto || coverPhoto.split('/').slice(-1)[0] === 'no_images.jpg') {
    coverPhoto = cover_night
  }

  const GetFollowingButton = ({
    vendor,
    following,
    handleFollowShop,
    handlePromptSignIn
  }) => {

    if ( vendor ) {
      return null;
    } else if (following) {
      return <Button  raised
                      disabled
                      label="Unfollow"/>
    }

    return <Button  raised
                    primary
                    onClick={
                      () => {
                        if (token) {
                          handleFollowShop(shop, token, shopName);
                        } else {
                          handlePromptSignIn(shopName);
                        }
                      }
                    }
                    label="Follow"/>
  }

  return (
    <div className={ productDetailsClass } >
      <div className="ShopPage-banner" style={{ backgroundImage: `url(${coverPhoto})`}}/>
      <div className={ detailsClass } data-tour="details-sidebar" >
        <div className="ShopPage-banner">
          <div className="ShopPage-details-img" style={{ backgroundImage: `url(${profilePic})` }} data-tour="shop-profile" >
            { vendor && <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') }/> }
          </div>
        </div>
        <div className="ShopPage-banner-divider">
          <MenuDivider/>
        </div>
        {
          vendor && <IconButton className="ShopPage-add-banner"
                                icon="add_a_photo"
                                onClick={ () => handleShowImageUploader('COVER') }/>
        }
        {/* ToDo: remove associated logic
            <IconButton icon={ (details) ? 'close' :'keyboard_arrow_down'}
                    className="ShopPage-details--toggle"
                    onClick={ toggleDetails }/> */}
        <div className="ShopPage-details-img" style={{ backgroundImage: `url(${profilePic})` }} >
          { vendor && <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') }/> }
        </div>

        <div className="ShopPage-details-description">
          <h2 className="ShopPage-details--title">{ shopName }</h2>
          <Stars rating="4" />
          {
            shopAddress &&
            <p className="ShopPage-details--address">
              <FontIcon value="store"/><label>{ shopAddress.details }</label>
            </p>
          }
          <ul className="ShopPage-details-contacts">
            {
              shopPhones.map(
                (contact, key) => {
                  /*{if (vendor) {
                   return  <div className="ShopPage-details-contacts--contact">
                   <Input label="Edit contact number"
                   value={ contact.number }
                   onChange={
                   value => handleEditContactNumber(contact.id, value)
                   }
                   />
                   <IconButton icon="save" onClick={ () => handleSaveContactNumber(contact.id) }/>
                   </div><h1 className="product-details-title">{ product.name }</h1>
                   <div className="product-details-price-title">
                     <h2 className="product-details-price">Price: &#2547; { product.price }</h2>
                     <Stars rating={ 3 } />
                   </div>
                   }}*/
                  return (
                    <li className="ShopPage-details--contact-number" key={key}>
                      <FontIcon value="local_phone"/> <label>{ contact.number }</label>
                    </li>
                  )
                }
              )
            }
          </ul>
          <GetFollowingButton vendor={ vendor }
                              following={ following }
                              handleFollowShop={ handleFollowShop }
                              handlePromptSignIn={ handlePromptSignIn }/>
        </div>
        <div className="ShopPage-details--text" data-tour="shop-description">
          {
              (editDesc) ? <div className="ShopPage-details--text-desc--update">
                <Input  label="Edit Shop Description"
                        value={ shortDesc }
                        multiline
                        onChange={
                          value => handleEditDescription(value)
                        }
                        />
                <IconButton icon="save"
                            onClick={ () => handleSaveDescription(info, shop, token) }/>
              </div> :
              <div className="ShopPage-details--text-desc--update">
                <p className="ShopPage-details--text-desc">
                  { shortDesc }
                </p>
                {
                  vendor && <IconButton icon="edit"
                                        onClick={ () => handleShowEditDescription() }/>
                }
              </div>
          }
        </div>
      </div>
        <div className="ShopPage-products">
          {
            (productDetails) ?
              <ProductDetails toggleDetails={ handleToggleProductDetails }
                              { ...selectedProductDetails }
                              product={ selectedProductDetails }
                              token={ token }
                              addToCart={ handleAddToCart }
                              setVariant={ handleSetVariant }
                              tabIndex={ productDetailstabIndex }
                              tabChange={ handleProductDetailsTab }
                              setAttribute={ handleSetAttribute }
                              vendor={vendor}
                              featured={ featured }
                              shop={ shop }
                              makeFeaturedProduct={ makeFeaturedProduct }
                              deleteFromFeaturedProduct={ deleteFromFeaturedProduct } />:
              [
                <div className="ShopPage-featured" key="arr-layout-1">
                  <FeaturedSlider vendor={ vendor }
                                  products = { featuredProducts.map(
                                                  (product, key) => <ProductCard  { ...product }
                                                                                  vendor={ vendor }
                                                                                  token={ token }
                                                                                  handleShowVendorDetails={ () => handleShowProductDetails(vendor, product) }
                                                                                  handleShowCustomerDetails={ () => handleShowProductDetails(false, product) }
                                                                                  key={ key }
                                                                                  addToCart={ handleAddToCart }
                                                                                  setVariant={ handleSetVariant } />
                                                ) }/>
                </div>,
                <div className="ShopPage-products--container" key="arr-layout-2">
                  <div className="ShopPage-products--container-scroll-div" data-tour="shop-banner" >
                    {
                      vendor && <IconButton className="ShopPage-banner--icon"
                                icon="add_a_photo"
                                onClick={ () => handleShowImageUploader('COVER') } />
                    }
                 </div>
                  <div className="ShopPage-products--categories">
                    {
                      products.map(
                        (obj, key) => <Chip onClick={ () => selectChip(key) }
                                            className={
                                              (selectedChip === key) ?
                                              'ShopPage-products--category ShopPage-products--categories-selected' :
                                              'ShopPage-products--category'
                                            }
                                            key={key}>
                                        {/*{ obj.first_parent.icon && <Avatar icon={ obj.first_parent.icon } /> }*/}
                                        { `${obj.name} (${obj.products.length})` }
                                      </Chip>
                      )
                    }
                  </div>
                  <div className="ShopPage-products--content">
                    <div className="ShopPage-products--list" >
                      {
                        (vendor) && <ProductCard  addProductCard
                                                  vendor={ vendor }
                                                  token={ token }
                                                  handleShowVendorDetails={ handleAddProduct }
                                                  handleShowCustomerDetails={ handleAddProduct }
                                                  key="AddProductKey"
                                                  addToCart={ handleAddToCart }
                                                  setVariant={ handleSetVariant }
                                                  data-tour="add-product" />
                      }
                      {
                        products[selectedChip].products.map(
                          (product, key) => <ProductCard  { ...product }
                                                          vendor={ vendor }
                                                          token={ token }
                                                          handleShowVendorDetails={ () => handleShowProductDetails(vendor, product) }
                                                          handleShowCustomerDetails={ () => handleShowProductDetails(false, product) }
                                                          key={ key }
                                                          addToCart={ handleAddToCart }
                                                          setVariant={ handleSetVariant } />
                        )
                      }
                    </div>
                    <div className="emptydiv-phone"></div>
                  </div>
                  <div className="ShopPage-banner" >
                    <div style={{ backgroundImage: `url(${coverPhoto})`}} className="ShopPage-banner" />
                  </div>
                </div>
              ]
          }
      </div>
    </div>
  );
}

export default ShopPage;
