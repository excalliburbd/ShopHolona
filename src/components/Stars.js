import React from 'react';

import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

import './Stars.css';

const Stars = ({
  rating
}) => {

  if(rating > 5) {
    rating = 5;
  }

  const iconsArray = [];

  for(let i=0; i<rating; i++) {
    iconsArray.push(<FontIcon value="star" key={ i } className="Stars-active"/>);
  }

  for(let i=rating; i < 5; i++) {
    iconsArray.push(<FontIcon value="star" key={ i } className="Stars-inactive"/>);
  }

  return (
    <div className="Stars">
      { iconsArray }
    </div>
  );
}

export default Stars;
