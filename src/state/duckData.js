// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";
import { fetchData } from "../helpers/client";
import { setPropInState } from "../helpers/stateHelpers";

import metrics from "../contents/metrics_list.fr.yml";

/**
 * ACTION NAMES
 */
import { SET_METRICS_ORDER_IS_VALIDATED } from "./duckUi";
const GET_DATA = "GET_DATA";
export const SET_METRICS_ORDER = "SET_METRICS_ORDER";
export const ADD_FILTERS = "ADD_FILTERS";
export const SET_CHOOSEN_MODEL = "SET_CHOOSEN_MODEL";

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

export const addFilters = (payload) => ({
  type: ADD_FILTERS,
  payload,
});

export const setChoosenModel = (payload) => ({
  type: SET_CHOOSEN_MODEL,
  payload,
});

/**
 * REDUCER
 */
const DEFAULT_STATE = {
  models: [],
  metricsOrder: [...metrics],
  filters: {},
  choosenModel: undefined,
};

function data(state = DEFAULT_STATE, action) {
  const { payload, result } = action;
  switch (action.type) {
    case "RESET_APP":
      return DEFAULT_STATE;
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
    case ADD_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload,
        },
      };
    // reset filters cases
    case SET_METRICS_ORDER_IS_VALIDATED:
      return {
        ...state,
        filters: DEFAULT_STATE.filters,
      };
    case SET_CHOOSEN_MODEL:
      return {
        ...state,
        choosenModel: payload,
      };
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
const filters = (state) => state.filters;
const choosenModel = (state) => state.choosenModel;

export const selector = createStructuredSelector({
  models,
  metricsOrder,
  filters,
  choosenModel,
});
