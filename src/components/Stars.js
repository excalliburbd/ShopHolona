import React from 'react';

import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

import './Stars.css';

const Stars = ({
  rating
}) => {

  const iconsArray = [];

  for(let i=0; i<rating; i++) {
    iconsArray.push(<FontIcon value="star" key={ i }/>);
  }

  return (
    <span style={{ color: 'orange' }}>
      <div className="rating-stars">{ iconsArray }</div>
    </span>


  );
}

export default Stars;
