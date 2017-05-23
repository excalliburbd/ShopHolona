import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import './AddButton.css';

const AddButton = ({
  location,
  handleAddProduct
}) => {

  if(location.pathname === '/') {
    return null;
  }
  return (
    <Button icon='add'
            floating
            onClick={ handleAddProduct }
            className="Addbutton" />
  );
}

export default AddButton;
