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
          ({ icon, text, stepNo }) => <div className="checkout-body--step">
            {
              step===stepNo?
              <div className="stepperImageContainer maximized">
                {step>=stepNo?null:<span></span>}
                <img className="step-image" src={icon} alt=""/>
              </div>
              :
              <div className="stepperImageContainer">
                {step>=stepNo?null:<span></span>}
                <img className="step-image" src={icon} alt=""/>
              </div>
            }
          </div>
        )
      }
  </div>
}

export default Stepper;
