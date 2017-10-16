import React from 'react';

import './Stepper.css';

const Stepper = ({
  steps,
  currentStep,
  hide,
}) => {
  return <div className={ `Stepper ${ hide ? 'Stepper-hidden' : null }` }>
  <hr/>
    {
      steps.map(
        ({ icon, text }) => <div className="checkout-body--step">
          <img className="step-image" src={icon} alt=""/>
          <p>{ text }</p>
        </div>
      )
    }
  </div>
}

export default Stepper;
