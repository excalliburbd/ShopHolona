import React from 'react';

import './VarianceSelector.css'

const VarianceSelector = (
  {
    selectedVariant,
    variances,
    handleSelectVariance,
    productID
  }
  ) => {

  return (
    <div className="variance-list">
      {
        variances.map(
          ({images}, key) => (
            <div  className="variances"
                  style={{backgroundImage: `url(${images[0].image})`}}
                  key={ key }
                  onClick={
                     () => handleSelectVariance(productID, key)
                  }
            >
              {console.log(images[0].image)}
            </div>
          )
        )
      }

    </div>
  );

}

export default VarianceSelector;
