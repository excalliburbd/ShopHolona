import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

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
    return <Button  icon="message"
                    floating
                    onClick={
                     () => {
                       const page = facebook.split('/')
                       window.open(`https://www.messenger.com/t/${page[page.length - 1]}`);
                     }
                    }
                    className="addbutton addbutton-social" />
  }

  return (
    <Button icon='add'
            floating
            onClick={ handleAddProduct }
            className="addbutton"
            data-tour="add-product"/>
  );
}

export default AddButton;
