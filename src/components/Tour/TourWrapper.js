import React, { PropTypes } from 'react';

import './TourComponent.css';

import tourbg from '../../assets/images/Background.png';
import tourMascot from '../../assets/images/Mascot.png';

const TourWrapper = ({
  title,
  children,
}) => {
  return (
    <div className="tour-container">
      <div className="tour-header">
        <img src={tourbg} alt="" className="tour-header-bg"/>
        <h1>{ title }</h1>
        <img src={ tourMascot } alt="mascot" className="tour-header-mascot"/>
      </div>
      <div className="tour-guide">
        {
          children
        }
      </div>
    </div>
  )
}

TourWrapper.proptypes = {
  title: PropTypes.string.isRequried,
  children: PropTypes.element.isRequired,
}

export default TourWrapper
