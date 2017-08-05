import { handleActions } from 'redux-actions';

import { tourActions } from '../actions/';

const tourInitialState = {
  isOpen: false,
  done: false,
  interrupt: false,
  interrruptStep: null,
  steps: {
    past: [],
    present: 0,
    future: [],
  },
  lastStep: null,
};

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
  [tourActions.tour.set.interrupt]: (state, action) => {
    return {
      ...state,
      interrupt: action.payload.state,
      interrruptStep: action.payload.step,
    }
  },
}, tourInitialState);
