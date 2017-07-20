import React, { Component } from 'react';
import Tour from 'reactour';

import { request, getConfig } from '../thunks/helpers';

import tourbg from '../assets/images/Background.png'
import tourMascot from '../assets/images/Mascot.png'
import './TourComponent.css';

class TourComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isOpen,
      shop,
      handleSetTour,
      loggedIn,
    } = nextProps;

    if (!this.state.done && !isOpen && shop && loggedIn) {
      request(`/shops/${shop}/products/`, getConfig() ).then(
        res => {
          if (res.length === 0) {
            !this.state.done && handleSetTour(true);//the gate feels hacky. find another way
          }
        }
      );
    }

  }

  render() {
    const {
      isOpen,
      handleSetTour,
      handleSetStep,
    } = this.props;

    // const defaultConfig = {
    //
    // }

    return (
      <Tour isOpen={ isOpen }
            className="tour-body"
            onRequestClose={
              () => {
                handleSetTour(false);
                this.setState({
                  done: true,
                })
              }
            }
            showNumber={ false }
            steps={
              [
                {
                  selector: '[data-tour="welcome"]',
                  content: ({ goTo, inDOM, step }) => {
                    handleSetStep(step);
                    return (
                      <div className="tour-container">
                        <div className="tour-header">
                          <img src={tourbg} alt="" className="tour-header-bg"/>
                          <h1>Hello!</h1>
                          <img src={tourMascot} alt="" className="tour-header-mascot"/>
                        </div>
                        <div className="tour-guide">
                          <p>Welcome to your store!</p>
                          <p>Let's go on a tour of your new store!</p>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  selector: '[data-tour="details-sidebar"]',
                  content: ({ goTo, inDOM, step }) => {
                    handleSetStep(step);
                    return (
                      <div>
                        <h3>First impressions matter!</h3>
                        <p>
                          This Side bar shows your customer your identity.
                        </p>
                        <p>It contains the following:</p>
                        <ul>
                          <li>Your Store Name.</li>
                          <li>Your Store’s address</li>
                          <li>Store Description</li>
                          <li>Your Store Logo</li>
                        </ul>
                      </div>
                    );
                  },
                },
                {
                  selector: '[data-tour="shop-profile"]',
                  content: ({ goTo, inDOM, step }) => {
                    handleSetStep(step);
                    return (
                      <div>
                        <p>
                          Start off by pressing on the ‘Camera’ button in the middle and change your store’s logo. Save it and press next when done!
                        </p>
                      </div>
                    )
                  },
                },
                {
                  selector: '[data-tour="shop-profile"]',
                  content: ({ goTo, inDOM, step }) => {
                    handleSetStep(step);
                    return (
                      <div>
                        <p>
                          Start off by pressing on the ‘Camera’ button in the middle and change your store’s logo. Save it and press next when done!
                        </p>
                      </div>
                    )
                  },
                },
              ]
            } />
    );
  }
}

export default TourComponent;
