import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-toolbox/lib/button/Button';

import './TourComponent.css';

import tourbg from '../../assets/images/Background.png';
import tourMascot from '../../assets/images/Mascot.png';

const TourWrapper = ({
  title,
  goTo,
  step,
  currentStep,
  lastStep,
  handleSkip,
  onNext,
  onPrevious,
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
      <div className="tour-container-actions">
        {
          (currentStep === 0) ?
            <Button style={{
                      visibility: 'hidden',
                    }}>Back</Button> :
            <Button onClick={
                      () => {
                        goTo(step - 2);
                        onPrevious && onPrevious();
                      }
                    }>Back</Button>
        }
        {
          (currentStep === lastStep) ?
            <Button onClick={
                      handleSkip
                    }>Finish</Button> :
            <Button onClick={
                      () => {
                        goTo(step);
                        onNext && onNext();
                      }
                    }>Next</Button>
        }
      </div>
    </div>
  )
}

TourWrapper.proptypes = {
  title: PropTypes.string.isRequried,
  children: PropTypes.element.isRequired,
}

export default TourWrapper;
