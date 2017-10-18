import React from 'react';

import './Stepper.css';

const Stepper = ({
  steps,
  currentStep,
  hide,
  step,
  handleClick,
}) => {
  return <div className={ `Stepper ${ hide ? 'Stepper-hidden' : "" }` }>
    <hr/>
      {
        steps.map(
          ({ icon, text, stepNo }, key) => <div className="checkout-body--step" key={ key }>
            {
              step===stepNo?
              <div className="stepperImageContainer maximized" onClick={ () => handleClick(key) }>
                {step>=stepNo?null:<span></span>}
                <img className="step-image" src={icon} alt=""/>
              </div>
              :
              <div className="stepperImageContainer" onClick={ () => handleClick(key) }>
                {step>=stepNo?null:<span></span>}
                <img className="step-image" src={icon} alt=""/>
              </div>
            }
            <p>{text}</p>
          </div>

        )
      }
  </div>
}

export default Stepper;
