import React from 'react';
import Icon from 'react-icons-kit';

import Button from 'react-toolbox/lib/button/Button';

import FaFacebook from 'react-icons/lib/fa/facebook';

import './AddButton.css';

const AddButton = ({
  location,
  handleAddProduct,
  vendor,
  facebook,
}) => {

  if(!vendor && !facebook) {
    return null;
  }

  if(!vendor && facebook) {
    return <Button  icon={ <FaFacebook />  }
                    floating
                    onClick={
                     () => {
                       const page = facebook.split('/')
                       window.location = `https://www.messenger.com/t/${page[page.length - 1]}`
                     }
                    }
                    className="addbutton addbutton-social" />
  }

  return (
    <Button icon='add'
            floating
            onClick={ handleAddProduct }
            className="addbutton" />
  );
}

export default AddButton;
