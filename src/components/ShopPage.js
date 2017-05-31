import React from 'react';
import classNames from 'classnames';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Chip from 'react-toolbox/lib/chip/Chip';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

import ProductCard from './ProductCard';
import Stars from './Stars';
import FeaturedSlider from './FeaturedSlider';

import './ShopPage.css'

const  ShopPage = ({
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
  proficePic,
  coverPhoto,
  shopPhones,
  shopAddress,
  handleEditContactNumber,
  handleSaveContactNumber,
}) => {

  const detailsClass = classNames({
    'ShopPage-details': true,
    'ShopPage-details--show': details,
  });

  return (
    <div className="ShopPage">
      <div className="ShopPage-banner" style={{ backgroundImage: `url(${coverPhoto})`}} />
      <div className={ detailsClass }>
        <div className="ShopPage-banner">
          <div className="ShopPage-details-img" style={{ backgroundImage: `url(${proficePic})` }}>
            <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') } />
          </div>
        </div>
        <div className="ShopPage-banner-divider"><MenuDivider/></div>
        <IconButton className="ShopPage-add-banner"
                    icon="add_a_photo" onClick={ () => handleShowImageUploader('COVER') } />
        <IconButton icon={ (details) ? 'close' :'keyboard_arrow_down'}
                    className="ShopPage-details--toggle"
                    onClick={ toggleDetails }/>
        <div className="ShopPage-details-img" style={{ backgroundImage: `url(${proficePic})` }}>
          <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') } />
        </div>

        <div className="ShopPage-details-description">
          <h2 className="ShopPage-details--text">{ shopName }</h2>
          <Stars rating="4" />
          {
            shopAddress &&
              <p className="ShopPage-details--address">
                <FontIcon value="store" /><label>{ shopAddress.details }</label>
              </p>
          }
          <ul className="ShopPage-details-contacts">
            {
              shopPhones.map(
                contact => {
                  {/*if (vendor) {
                     return  <div className="ShopPage-details-contacts--contact">
                                <Input label="Edit contact number"
                                    value={ contact.number }
                                    onChange={
                                      value => handleEditContactNumber(contact.id, value)
                                    }
                                />
                                <IconButton icon="save" onClick={ () => handleSaveContactNumber(contact.id) }/>
                             </div>
                  }*/}
                  return <li className="ShopPage-details--contact-number">
                            <FontIcon value="local_phone" /> <label>{ contact.number }</label>
                         </li>
                }
              )
            }
          </ul>
          { !vendor &&  <Button raised primary label="Follow" />}
        </div>
        <MenuDivider/>
        <p className="ShopPage-details--text-desc">{shortDesc}</p>
        <MenuDivider/>
      </div>
      <div className="ShopPage-products">
        <div className="ShopPage-featured">
          <FeaturedSlider vendor={ vendor }
                          products = { featuredProducts.map(
                                          (porduct, key) => <ProductCard { ...porduct }
                                                                          vendor={ vendor }
                                                                          handleShowDetails={ () => handleShowProductDetails(vendor, porduct) }
                                                                          key={ key }/>
                                        ) }/>
        </div>
        <div className="ShopPage-products--container">
          <div className="ShopPage-products--container-scroll-div" />
          <div className="ShopPage-products--categories">
            {
              products.map(
                (obj, key) => <Chip onClick={ () => selectChip(key) }
                                    className={ (selectedChip === key) ? 'ShopPage-products--categories-selected' : 'null' }
                                    key={key}>
                                { obj.name }
                              </Chip>
              )
            }
          </div>
          <div className="ShopPage-products--content">
            <div className="ShopPage-products--list">
              {
                (vendor) && <ProductCard  addProductCard
                                          vendor={ vendor }
                                          handleShowDetails={ handleAddProduct }
                                          key="AddProductKey" />
              }
              {
                products[selectedChip].products.map(
                  (porduct, key) => <ProductCard { ...porduct }
                                                  vendor={ vendor }
                                                  handleShowDetails={ () => handleShowProductDetails(vendor, porduct) }
                                                  key={ key }/>
                )
              }
            </div>
            <div className="emptydiv-phone"></div>
          </div>
          <div className="ShopPage-banner" >
            <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('COVER') } />
            <div style={{ backgroundImage: `url(${coverPhoto})`}} className="ShopPage-banner--fixed" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage;
