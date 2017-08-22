import React from 'react';

// import Button from 'react-toolbox/lib/button/Button';

import VarianceSelector from './VarianceSelector';

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

  const colorsArray = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4"].slice(0, variances.length);

  if (colorsArray.length < variances.length) {
    for(let i=0; i<(variances.length - colorsArray.length); i++) {
      colorsArray.push('#ccc');
    }
  }

  const attributesArray = variances[selectedVariant].attributes;

  return (
    <div className="details-main-container">
      <div className="details-main-primay">
        {/*<h4 className="details-main-subtitle">{ variances[0].type.name }</h4>*/}
        <h4 className="details-main-subtitle">Variances</h4>
        <VarianceSelector
          selectedVariant= { selectedVariant }
          variances= { variances }
          handleSelectVariance={ selectVariance }
          productID={ id }
        />
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

      <div className="details-main-desc">
        <h4 className="details-main-subtitle">Description</h4>
        <p>{ shortDesc }</p>
      </div>

      <div className="details-main-weight">
        <h4 className="details-main-subtitle">Weight</h4>
        <p>{ weight } grams</p>
      </div>

    </div>
  );

}

export default ProductDetailsMain;
