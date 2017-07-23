import { handleActions } from 'redux-actions';

import { tourActions } from '../actions/';

export const tourUIReducer = handleActions({
  [tourActions.tour.set.open]: (state, action) => {
    return {
      ...state,
      isOpen: action.payload,
    }
  },
  [tourActions.tour.set.history]: (state, action) => {
    const past = state.steps.past;
    const future = state.steps.future;
    const nextStep = action.payload;
    const presentStep = state.steps.present;

    if (nextStep !== presentStep) {
      if (nextStep > presentStep) {
        past.push(presentStep);
        future.pop();
      } else {
        future.push(presentStep);
        past.pop();
      }
    }

    return {
      ...state,
      steps: {
        ...state.steps,
        past,
        present: nextStep,
        future,
      }
    }
  },
  [tourActions.tour.set.done]: (state, action) => {
    return {
      ...state,
      done: action.payload,
    }
  },
  [tourActions.tour.set.lastStep]: (state, action) => {
    return {
      ...state,
      lastStep: action.payload,
    }
  },
}, {
  isOpen: false,
  done: false,
  steps: {
    past: [],
    present: 0,
    future: [],
  },
  lastStep: null,
});
