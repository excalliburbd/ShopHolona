import React, { Component } from 'react';
import {connect} from 'react-redux';
import Tour from 'reactour';

import { tourActions } from '../actions/';

import { request, getConfig } from '../thunks/helpers';

import { getShopID } from '../selectors/shopSelectors';

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
      handleSetTour,
    } = nextProps;

    if (!isOpen && shop) {
      request(`/shops/${shop}/products/`, getConfig() ).then(
        res => {
          if (res.length === 0) {
            handleSetTour(true);
          }
        }
      );
    }

  }

  render() {
    const {
      isOpen,
      handleSetTour,
    } = this.props;

    return (
      <Tour isOpen={ isOpen }
            steps={[
                {
                selector: '[data-tour="welcome"]',
                content: ({ goTo, inDOM }) => (
                  <div>
                    <h3><span role="img" aria-label="horray" >🎉 🎉 🎉</span> Hello!!!</h3>
                    <p>
                      Welcome to your store! We will take you on a step by step journey to getting full control of your store.
                    </p>
                  </div>
                ),
                position: 'top',
                action: node => {
                  node.focus()
                },
              },
            ]}
            onRequestClose={
              () => handleSetTour(false)
            } />
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.ui.tour.isOpen,
    shop: getShopID(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleToggleTour: (open) => {
      dispatch(tourActions.tour.set.open(!open));
    },
    handleSetTour: (open) => {
      dispatch(tourActions.tour.set.open(open));
    }
  }
}

const TourContainer = connect(mapStateToProps, mapDispatchToProps)(TourComponent);

export default TourContainer;
