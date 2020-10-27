// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";
import { fetchData } from "../helpers/client";
/**
 * ACTION NAMES
 */
const GET_DATA = "GET_DATA";

/**
 * ACTION FUNCTIONS
 */
export const getData = (payload) => ({
  type: GET_DATA,
  payload,
  promise: () => fetchData(),
});

/**
 * REDUCER
 */
const DEFAULT_STATE = {
  models: [],
};

function data(state = DEFAULT_STATE, action) {
  const { payload, result } = action;
  switch (action.type) {
    case `${GET_DATA}`:
      return state;
    case `${GET_DATA}_SUCCESS`:
      return {
        ...state,
        models: result,
      };
    case `${GET_DATA}_ERROR`:
      return state;
    default:
      return state;
  }
}

// export default combineReducers({data, ...})
export default data;

/**
 * SELECTOR
 */

const models = (state) => state.models;

export const selector = createStructuredSelector({
  models,
});
