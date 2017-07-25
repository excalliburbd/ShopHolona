import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

export const getBanksArray = state => state.banks;
export const getBanksObj = state => state.entities.banks;
export const getBankID = state => state.ui.paymentsAndAddresses.bankID;

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
    return id && new Fuse(banksObj[id].branches, { keys: ['name'] });
  }
);
