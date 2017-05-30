import React from 'react';
import FaStar from 'react-icons/lib/fa/star';

import './Stars.css';

const Stars = ({
  rating
}) => {

  if(rating > 5) {
    rating = 5;
  }

  const iconsArray = [];

  for(let i=0; i<rating; i++) {
    // iconsArray.push(<FontIcon value="star" key={ i } className="Stars-active"/>);
    iconsArray.push(<FaStar value="star" key={ i } className="Stars-active"/>);
  }

  for(let i=rating; i < 5; i++) {
    iconsArray.push(<FaStar value="star" key={ i } className="Stars-inactive"/>);
  }

  return (
    <div className="Stars">
      { iconsArray }
    </div>
  );
}

export default Stars;
