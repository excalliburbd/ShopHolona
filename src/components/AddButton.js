import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import './AddButton.css';

const AddButton = ({
  handleAddProduct
}) => {
  return (
    <Button icon='add'
            floating
            onClick={ handleAddProduct }
            className="Addbutton" />
  );
}

export default AddButton;
