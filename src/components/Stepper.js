import React from 'react';

import './Stepper.css';

const Stepper = ({
  steps,
  currentStep,
  hide,
  step,
}) => {
  return <div className={ `Stepper ${ hide ? 'Stepper-hidden' : "" }` }>
  <hr/>
    {
      steps.map(
        ({ icon, text }) => <div className="checkout-body--step">
          <div className="stepperImageContainer">
          <img className="step-image" src={icon} alt=""/>
          </div>
          <p>{ text }</p>
        </div>
      )
    }
  </div>
}

export default Stepper;
