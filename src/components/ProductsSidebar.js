import React from 'react';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Input from 'react-toolbox/lib/input';
import MdEmail from 'react-icons/lib/md/email';
import MdLocalPhone from 'react-icons/lib/md/local-phone';
import FaCode from 'react-icons/lib/fa/code';

const ProductsSidebar = ({
  type,
  productName,
  productShrotDesc,
  productLongDesc,
  handleFieldChange,
}) => {
  switch(type) {
    case 'ADD_PRODUCT':
      return <div>
        <Input type='text'
               label='Name'
               value={ productName }
               onChange={ () => handleFieldChange('ADD_PRODUCT', 'NAME') }
               maxLength={ 100 } />
        <Input type='text'
               multiline
               label='Short Description'
               value={ productShrotDesc}
               onChange={ () => handleFieldChange('ADD_PRODUCT', 'SHORT_DESC') }
               maxLength={ 150 } />
        <Input type='text'
               multiline
               label='Long Description'
               value={ productLongDesc }
               onChange={ () => handleFieldChange('ADD_PRODUCT', 'LONG_DESC') } />
      </div>
    default:
      return <div />
  }
}

export default ProductsSidebar;
