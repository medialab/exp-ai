// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";

/**
 * ACTION NAMES
 */
const DATA_HISTORY = "DATA_HISTORY";

/**
 * ACTION FUNCTIONS
 */
export const dataHistory = (payload) => ({
  type: DATA_HISTORY,
  payload,
});

/**
 * REDUCER
 */
const DEFAULT_STATE = {};

function data(state = DEFAULT_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    default:
      return state;
  }
}

// export default combineReducers({data, ...})
export default data;

/**
 * SELECTOR
 */

// const step = ( state ) => state.step;

export const selector = createStructuredSelector({
  // step
});
