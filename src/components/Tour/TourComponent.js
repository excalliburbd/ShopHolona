import React, { Component } from 'react';
import Tour from 'reactour';

import { request, getConfig } from '../../thunks/helpers';

import TourWrapperContainer from '../../containers/TourWrapperContainer';

import config from '../../config';

class TourComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  tourSteps = []

  componentWillReceiveProps(nextProps) {
    const {
      shop,
      done,
      handleSetTour,
      tourOnStartup,
    } = nextProps;

    if (tourOnStartup) {
      request(`/shops/${shop}/products/`, getConfig() ).then(
        res => {
          if (res.length === 0) {
            !done && handleSetTour(true);//the gate feels hacky. find another way
          } else if (shop === config.demostore) {
            !done && handleSetTour(true);
          }
        }
      );
    }

  }

  componentWillUpdate(nextProps, nextState) {
    nextProps.handleSetLastStep(this.tourSteps.length - 1);
  }

  render() {
    const {
      isOpen,
      handleSetTour,
      handleSetStep,
      handleSetDone,
      history,
      location,
    } = this.props;

    this.tourSteps = [
      {
        selector: '[data-tour="welcome"]',
        content: ({ goTo, inDOM, step }) => {
          this.goTo = goTo;
          return (
            <TourWrapperContainer title="Hello!!"
                          goTo={ goTo }
                          step={ step } >
              <p>Welcome to your store!</p>
              <p>Let's go on a tour of your new store!</p>
            </TourWrapperContainer>
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
            <TourWrapperContainer title="Hello!!"
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
            </TourWrapperContainer>
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
            <TourWrapperContainer title="Profile Picture"
                          goTo={ goTo }
                          step={ step } >
              <p>
                Start off by pressing on the ‘Camera’ button in the middle and change your store’s logo. Save it and press next when done!
              </p>
            </TourWrapperContainer>
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
            <TourWrapperContainer title="Store Description"
                          goTo={ goTo }
                          step={ step } >
              <p>
                Change your store’s description right from here! Press on the edit button and change the description. Save it and press next when done!
              </p>
            </TourWrapperContainer>
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
            <TourWrapperContainer title="Cover Photo"
                          goTo={ goTo }
                          step={ step } >
              <h3>The background is just as important as your logo!</h3>
              <p>
                photo of your store by pressing on the ‘Camera’ button on the top left hand corner!
              </p>
            </TourWrapperContainer>
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
            <TourWrapperContainer title="Add New Products"
                          goTo={ goTo }
                          step={ step } >
              <p>
                Add your first products to the store. Click on the ‘+’ button to start adding.
              </p>
            </TourWrapperContainer>
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
            <TourWrapperContainer title="Dashboard"
                          goTo={ goTo }
                          step={ step }
                          onNext={
                            () => {
                              history.push('/dashboard');
                            }
                          } >
              <p>
                Now that you have added your first product, you should check out your dashboard!
              </p>
              <p>This contains everything you need to know about how your store is running! </p>
              <p>Click here to go to dashboard.</p>
            </TourWrapperContainer>
          );
        },
        action: () => {
          handleSetStep(6);
          if (location.pathname !== '/') {
            history.push('/')
          }
        },
      },
      {
        selector: '[data-tour="navigation-content"]',
        content: ({ goTo, inDOM, step }) => {
          this.goTo = goTo;
          return (
            <TourWrapperContainer  title="Overview"
                          goTo={ goTo }
                          step={ step }
                          onNext={
                            () => {
                              history.push('/admin/orders');
                            }
                          }
                          onPrevious={
                            () => {
                              history.push('/');
                            }
                          } >
              <p>This is where you see all your important statistics. Press any of these boxes to be taken into those sections. </p>
            </TourWrapperContainer>
          );
        },
        action: () => {
          handleSetStep(7);
          if (location.pathname !== '/dashboard') {
            history.push('/dashboard')
          }
        },
      },
      {
        selector: '[data-tour="navigation-content"]',
        content: ({ goTo, inDOM, step }) => {
          this.goTo = goTo;
          return (
            <TourWrapperContainer title="Orders"
                          goTo={ goTo }
                          step={ step }
                          onNext={
                            () => {
                              history.push('/admin/products');
                            }
                          }
                          onPrevious={
                            () => {
                              history.push('/dashboard');
                            }
                          } >
              <p>
                As soon as you have an order for your product, it will be displayed on this page. Press the export button bubble to export the data in your preferred format!
              </p>
            </TourWrapperContainer>
          );
        },
        action: () => {
          handleSetStep(8);
          if (location.pathname !== '/admin/orders') {
            history.push('/admin/orders')
          }
        }
      },
      {
        selector: '[data-tour="navigation-content"]',
        content: ({ goTo, inDOM, step }) => {
          this.goTo = goTo;
          return (
            <TourWrapperContainer title="Products"
                          goTo={ goTo }
                          step={ step }
                          onNext={
                            () => {
                              history.push('/admin/reports');
                            }
                          }
                          onPrevious={
                            () => {
                              history.push('/admin/orders');
                            }
                          } >
              <p>
                All your product details in one page. We call this the boring way to manage your products! Press the export button bubble to export the data in your preferred format!
              </p>
            </TourWrapperContainer>
          );
        },
        action: () => {
          handleSetStep(9);
          if (location.pathname !== '/admin/products') {
            history.push('/admin/products')
          }
        }
      },
      {
        selector: '[data-tour="navigation-content"]',
        content: ({ goTo, inDOM, step }) => {
          this.goTo = goTo;
          return (
            <TourWrapperContainer title="Reports"
                          goTo={ goTo }
                          step={ step }
                          onNext={
                            () => {
                              history.push('/settings');
                            }
                          }
                          onPrevious={
                            () => {
                              history.push('/admin/products');
                            }
                          } >
              <p>Here you can see the data for your store.</p>
            </TourWrapperContainer>
          );
        },
        action: () => {
          handleSetStep(10);
          if (location.pathname !== '/admin/reports') {
            history.push('/admin/reports');
          }
        }
      },
      {
        selector: '[data-tour="navigation-content"]',
        content: ({ goTo, inDOM, step }) => {
          this.goTo = goTo;
          return (
            <TourWrapperContainer title="Settings"
                          goTo={ goTo }
                          step={ step }
                          onPrevious={
                            () => {
                              history.push('/admin/reports');
                            }
                          } >
              <p>
                The most important part of your store. Please ensure all the information here are inserted correctly as this is what we will be reviewing your store on!
              </p>
            </TourWrapperContainer>
          );
        },
        action: () => {
          handleSetStep(11);
          if (location.pathname !== '/settings') {
            history.push('/settings');
          }
        }
      },
    ];

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
            maskSpace={ 0 }
            steps={
              this.tourSteps
            } />
    );
  }
}

export default TourComponent;
