import React, { Component } from 'react';
import Tour from 'reactour';

import { request, getConfig } from '../../thunks/helpers';

import TourWrapper from './TourWrapper';

class TourComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isOpen,
      shop,
      done,
      handleSetTour,
      loggedIn,
    } = nextProps;

    if (!done && !isOpen && shop && loggedIn) {
      request(`/shops/${shop}/products/`, getConfig() ).then(
        res => {
          if (res.length === 0) {
            !done && handleSetTour(true);//the gate feels hacky. find another way
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
      handleSetDone,
      steps,
      history,
      location,
    } = this.props;

    return (
      <Tour isOpen={ isOpen }
            className="tour-body"
            onRequestClose={
              () => {
                handleSetDone(true);
                handleSetTour(false);
              }
            }
            showNumber={ false }
            showButtons={ false }
            steps={
              [
                {
                  selector: '[data-tour="welcome"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Hello!!"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>Welcome to your store!</p>
                        <p>Let's go on a tour of your new store!</p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(0);
                  }
                },
                {
                  selector: '[data-tour="details-sidebar"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Hello!!"
                                   goTo={ goTo }
                                   step={ step } >
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
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(1);
                  }
                },
                {
                  selector: '[data-tour="shop-profile"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Profile Picture"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>
                          Start off by pressing on the ‘Camera’ button in the middle and change your store’s logo. Save it and press next when done!
                        </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(2);
                  }
                },
                {
                  selector: '[data-tour="shop-description"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Store Description"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>
                          Change your store’s description right from here! Press on the edit button and change the description. Save it and press next when done!
                        </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(3);
                  }
                },
                {
                  selector: '[data-tour="shop-banner"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Cover Photo"
                                   goTo={ goTo }
                                   step={ step } >
                        <h3>The background is just as important as your logo!</h3>
                        <p>
                          photo of your store by pressing on the ‘Camera’ button on the top left hand corner!
                        </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(4);
                  }
                },
                {
                  selector: '[data-tour="add-product"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Add New Products"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>
                          Add your first products to the store. Click on the ‘+’ button to start adding.
                        </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(5);
                  }
                },
                {
                  selector: '[data-tour="click-dashboard"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Dashboard"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>
                          Now that you have added your first product, you should check out your dashboard!
                        </p>
                        <p>This contains everything you need to know about how your store is running! </p>
                        <p>Click here to go to dashboard.</p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(6);
                    setTimeout( () => {
                      (location.pathname !== '/dashboard') && history.push('/dashboard');
                      this.goTo && this.goTo(7);
                    }, 10000 );
                  }
                },
                {
                  selector: '[data-tour="navigation-content"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Overview"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>This is where you see all your important statistics. Press any of these boxes to be taken into those sections. </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    if (location.pathname === '/') {
                      history.push('/dashboard');
                    }
                    handleSetStep(7);
                  }
                },
                {
                  selector: '[data-tour="navigation-content"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Orders"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>
                          As soon as you have an order for your product, it will be displayed on this page. Press the export button bubble to export the data in your preferred format!
                        </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(8);
                  }
                },
                {
                  selector: '[data-tour="navigation-content"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Products"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>
                          All your product details in one page. We call this the boring way to manage your products! Press the export button bubble to export the data in your preferred format!
                        </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(9);
                  }
                },
                {
                  selector: '[data-tour="navigation-content"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Reports"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>Here you can see the data for your store.</p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(10);
                  }
                },
                {
                  selector: '[data-tour="navigation-content"]',
                  content: ({ goTo, inDOM, step }) => {
                    this.goTo = goTo;
                    return (
                      <TourWrapper title="Settings"
                                   goTo={ goTo }
                                   step={ step } >
                        <p>
                          The most important part of your store. Please ensure all the information here are inserted correctly as this is what we will be reviewing your store on!
                        </p>
                      </TourWrapper>
                    );
                  },
                  action: () => {
                    handleSetStep(11);
                  }
                },
              ]
            } />
    );
  }
}

export default TourComponent;
