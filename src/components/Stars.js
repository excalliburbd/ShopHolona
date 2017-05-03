import React from 'react';

import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';


const Stars = ({
  rating
}) => {

  const iconsArray = [];

  for(let i=0; i<rating; i++) {
    iconsArray.push(<FontIcon value="star" />);
  }

  return (
    <span style={{ color: 'orange' }}>
      { iconsArray }
    </span>
  );
}

export default Stars;
