import { combineReducers } from 'redux';

const UIReducer = (state = {
  pinned: true,
}, action ) => {

  return state;
}

const RootReducer = combineReducers({
  ui: UIReducer
});

export default RootReducer;
