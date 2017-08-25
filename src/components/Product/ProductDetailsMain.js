import React from 'react';

// import Button from 'react-toolbox/lib/button/Button';

import VariantSelector from './VariantSelector';

import './ProductDetailsMain.css';

const ProductDetailsMain = ({
  id,
  variances,
  addToCart,
  weight,
  selectedVariant,
  selectedAttribute,
  select,
  chooseAttribute,
  token,
  short_desc: shortDesc,
  vendor,
  featured,
  shop,
  deleteFromFeaturedProduct,
  makeFeaturedProduct,
  featuredID,
  selectVariance,
}) => {
  if ( shortDesc === '' ) {
    shortDesc = 'No description available';
  }

  const attributesArray = variances[selectedVariant].attributes;

  return (
    <div className="details-main-container">
      <div className="details-main-primay">
        {/*<h4 className="details-main-subtitle">{ variances[0].type.name }</h4>*/}
        <h4 className="details-main-subtitle">Variants</h4>
        <VariantSelector
          selectedVariant= { selectedVariant }
          variances= { variances }
          handleSelectVariance={ selectVariance }
          productID={ id }
        />
      </div>

      <div className="details-main-secondary">
        <h4 className="details-main-subtitle">Stock</h4>
        <div className="details-main-stock">
          <div className="details-main-stock--value">
            { attributesArray.reduce( (acc, curr) => {
              if (curr.stock !== '') {
                return parseInt(curr.stock, 10) + acc;
              }
              return 0 + acc;
            }, 0) }
          </div>
        </div>
      </div>

      <div className="details-main-secondary">
        <h4 className="details-main-subtitle">
          { attributesArray[0].type.name }
        </h4>
        <ul className="details-sizes">
          {
            attributesArray.map(
              (attribute, key) => {
                return <li className={
                            (key === selectedAttribute) ?
                              'details-main-secondary-size details-main-secondary-size--selected' :
                              'details-main-secondary-size'
                          }
                          onClick={
                            () => {
                              chooseAttribute(id, key);
                            }
                          }
                          key={ key }>
                          { attribute.type.value }
                        </li>
              }
            )
          }
        </ul>
      </div>

      <div className="details-main-weight">
        <h4 className="details-main-subtitle">Weight</h4>
        <p>{ weight } grams</p>
      </div>

      <div className="details-main-desc">
        <h4 className="details-main-subtitle">Description</h4>
        <p>{ shortDesc }</p>
      </div>

    </div>
  );

}

export default ProductDetailsMain;
