import { createSelector } from 'reselect';

import {
  getLoggedIn,
  getVendor,
} from '../selectors/userSelectors';
import { getShopID } from '../selectors/shopSelectors';

export const getTourIsOpen = state => state.ui.tour.isOpen;
export const getCurrentStep = state => state.ui.tour.steps.present;
export const getLastStep = state => state.ui.tour.lastStep;
export const getTourSteps = state => state.ui.tour.steps;
export const getTourDone = state => state.ui.tour.done;
export const getTourInterrupt = state => state.ui.tour.interrupt;
export const getTourInterruptStep = state => state.ui.tour.interruptStep;

export const getShowTourOnStartUp = createSelector(
  [getTourDone, getTourIsOpen, getTourInterrupt, getShopID, getLoggedIn, getVendor],
  (done, isOpen, interrupt, shop, loggedIn, vendor) => {
    return !done && !isOpen && !interrupt && shop && loggedIn && vendor
  }
)
