import React from 'react';

import './Stepper.css';

const Stepper = ({
  steps,
  currentStep,
  hide,
  step,
}) => {
  console.log(step)
  return <div className={ `Stepper ${ hide ? 'Stepper-hidden' : "" }` }>
  <hr/>
    {
      steps.map(
        ({ icon, text, stepNo }) => <div className="checkout-body--step">
          {
            step===stepNo?
            <div className="stepperImageContainer maximized">
              <img className="step-image" src={icon} alt=""/>
            </div>
            :
            <div className="stepperImageContainer">
              <img className="step-image" src={icon} alt=""/>
            </div>
          }
          <p>{ text }</p>
        </div>
      )
    }
  </div>
}

export default Stepper;
