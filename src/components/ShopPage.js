import React, { Component } from 'react';
import classNames from 'classnames';

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


import ProductCard from './ProductCard';
import Stars from './Stars';
import FeaturedSlider from './FeaturedSlider';

import './ShopPage.css'

class ShopPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    const {
      shop,
    } = this.props;

    this.props.getShopCategories(
      shop
    );

    this.props.getAllProducts(
      shop,
    );
  }

  render() {
    const {
      toggleDetails,
      details,
      shopName,
      shortDesc,
      products,
      selectedChip,
      selectChip,
    } = this.props;

    const detailsClass = classNames({
      'ShopPage-details': true,
      'ShopPage-details--show': details,
    });

    return (
      <div className="ShopPage">
        <div className="ShopPage-banner" />
        <div className={ detailsClass }>
          <div className="ShopPage-banner">
            <div className="ShopPage-details-img" />
          </div>
          <IconButton icon={ (details) ? 'close' :'keyboard_arrow_down'}
                      className="ShopPage-details--toggle"
                      onClick={ toggleDetails }/>
          <div className="ShopPage-details-img" />
          <div className="ShopPage-details-description">
            <h2 className="ShopPage-details--text">{ shopName }</h2>
            <p className="ShopPage-details--text">Address</p>
            <Stars rating="4" />
            <Button raised primary label="Follow" />
            <p className="ShopPage-details--text-desc">{shortDesc}</p>
          </div>
        </div>
        <div className="ShopPage-products">
          <div className="ShopPage-featured">
            <FeaturedSlider />
          </div>
          <div className="ShopPage-products--container">
            <div className="ShopPage-banner" />
            <div className="ShopPage-products--categories">
              {
                products.map(
                  (obj, key) => <Chip onClick={ () => selectChip(key) } key={key}>
                                  { obj.name }
                                </Chip>
                )
              }
            </div>
            <div className="ShopPage-products--content">
              <div className="ShopPage-products--list">
                {
                  products[selectedChip].products.map(
                    (porduct, key) => <ProductCard { ...porduct } key={ key }/>
                  )
                }
              </div>
              <div className="emptydiv-phone"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShopPage;
