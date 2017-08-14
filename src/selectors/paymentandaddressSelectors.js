import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

export const getBanksArray = state => state.banks;
export const getBanksObj = state => state.cachedEntities.banks;
export const getBankID = state => state.ui.paymentsAndAddresses.bankID;
export const getAllDistricts = state => state.cachedEntities.addresses.districts;
export const getAllCities = state => state.cachedEntities.addresses.cities;
export const getAllThanas = state => state.cachedEntities.addresses.thanas;

export const getAllbankInfo = createSelector(
  [getBanksArray, getBanksObj],
  (banksArr, banksObj) => {
    const banks = banksArr.map(
      id => (banksObj[id])
    );

    if (banks.length === 0 || ! banks[0]) {
      return [];
    }

    return banks;
  }
);

export const getAllbanks = createSelector(
  [getAllbankInfo],
  (banks) => {
    if (banks.length === 0 ) {
      return null;
    }

    return new Fuse(banks, { keys: ['name'] });
  }
);

export const getAllBranches = createSelector(
  [getBankID, getBanksObj],
  (id, banksObj) => {
    if (banksObj[id] && !banksObj[id].branches) {
      return null;
    }

    return id && new Fuse(banksObj[id].branches, { keys: ['name'] });
  }
);

export const getFusedDistricts = createSelector(
  [getAllDistricts],
  (districts) => {
    if (districts.length === 0 ) {
      return null;
    }

    return new Fuse(districts, { keys: ['name'] });
  }
);

export const getFusedCities = createSelector(
  [getAllCities],
  (cities) => {
    if (cities.length === 0 ) {
      return null;
    }

    return new Fuse(cities, { keys: ['name'] });
  }
);

export const getFusedThanas = createSelector(
  [getAllThanas],
  (thanas) => {
    if (thanas.length === 0 ) {
      return null;
    }

    return new Fuse(thanas, { keys: ['name'] });
  }
);
