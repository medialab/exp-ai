// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";
import { fetchData } from "../helpers/client";
import { setPropInState } from "../helpers/stateHelpers";

import metrics from "../contents/metrics_list.fr.yml";

/**
 * ACTION NAMES
 */
const GET_DATA = "GET_DATA";
export const SET_METRICS_ORDER = "SET_METRICS_ORDER";

/**
 * ACTION FUNCTIONS
 */
export const getData = (payload) => ({
  type: GET_DATA,
  payload,
  promise: () => fetchData(),
});

export const setMetricsOrder = (payload) => ({
  type: SET_METRICS_ORDER,
  payload,
});

/**
 * REDUCER
 */
const DEFAULT_STATE = {
  models: [],
  metricsOrder: [...metrics],
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
    case SET_METRICS_ORDER:
      return setPropInState(action.type, payload, state);
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
const metricsOrder = (state) => state.metricsOrder;

export const selector = createStructuredSelector({
  models,
  metricsOrder,
});
