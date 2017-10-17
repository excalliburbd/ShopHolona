import React from 'react';

import './Stepper.css';

const Stepper = ({
  steps,
  currentStep,
  hide,
}) => {
<<<<<<< Updated upstream
  return <div className={ `Stepper ${ hide ? 'Stepper-hidden' : null }` }>
=======
  console.log(step);
  return <div className={ `Stepper ${ hide ? 'Stepper-hidden' : "" }` }>
>>>>>>> Stashed changes
  <hr/>
    {
      steps.map(
        ({ icon, text }) => <div className="checkout-body--step">
<<<<<<< Updated upstream
          <img className="step-image" src={icon} alt=""/>
=======
          <div className="stepperImageContainer ${}">
            <img className="step-image" src={icon} alt=""/>
          </div>
>>>>>>> Stashed changes
          <p>{ text }</p>
        </div>
      )
    }
  </div>
}

export default Stepper;
