import React from 'react';

import './VariantSelector.css'

const VariantSelector = (
  {
    selectedVariant,
    variances,
    handleSelectVariance,
    productID
  }
  ) => {

  return (
    <div className="variant-list">
      {
        variances.map(
          ({images, type}, key) => (
            <div  className={
                    (key === selectedVariant) ?
                      'variant variant--selected' :
                      'variant'
                  }
                  style={{backgroundImage: `url(${images[0].image})`}}
                  title={type.value}
                  key={ key }
                  onClick={
                     () => handleSelectVariance(productID, key)
                  }
            >
            </div>
          )
        )
      }

    </div>
  );

}

export default VariantSelector;
