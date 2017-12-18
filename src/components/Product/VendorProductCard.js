import React from 'react';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import Button from 'react-toolbox/lib/button/Button';

import Stars from '../Stars';

const VendorProductCard = ({
  id,
  handleShowVendorDetails,
  addProductIcon
}) => (
    <Card className="ProductCard ProductCard--addProduct" onClick={() => handleShowVendorDetails(id)}>
    <CardMedia aspectRatio="square" />
    <div className="ProductCard-details ProductCard--addProduct-details">
      <div className="ProductCard--addProduct-details-icon">
        <img className="addicon" src={addProductIcon} alt="Add icon" />
      </div>
      <h3 className="ProductCard-details-name ProductCard--addProduct-details-content">
        Add A New Product
      </h3>
      <h3 className="ProductCard-details-name ProductCard--addProduct-details-name">
        Add Products
      </h3>
      <div className="ProductCard--addProduct-rating">
        <Stars rating={0} />
      </div>
    </div>
    <Button className="ProductCard--addProduct-button" raised label="Add Products" />
  </Card>
);

export default VendorProductCard;
