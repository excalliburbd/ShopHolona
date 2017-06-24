import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

export const getBanksArray = state => state.banks;
export const getBanksObj = state => state.entities.banks;

export const getAllbanks = createSelector(
  [getBanksArray, getBanksObj],
  (banksArr, banksObj) => {
    const banks = banksArr.map(
      id => (banksObj[id])
    );

    return new Fuse(banks, { keys: ['name'] });
  }
);
