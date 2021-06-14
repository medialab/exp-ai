// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";
import { fetchData } from "../helpers/client";
import { setPropInState } from "../helpers/stateHelpers";

import metrics from "../contents/metrics_list.fr.yml";
import variables from "../contents/variables_list.fr.yml";

/**
 * ACTION NAMES
 */
import { SET_METRICS_ORDER_IS_VALIDATED } from "./duckUi";
const GET_DATA = "GET_DATA";
export const SET_METRICS_ORDER = "SET_METRICS_ORDER";
export const SET_PRIVACY_VARIABLES = "SET_PRIVACY_VARIABLES";
export const ADD_FILTERS = "ADD_FILTERS";
export const SET_CHOOSEN_MODEL = "SET_CHOOSEN_MODEL";
export const SET_DATAIKU_RESULTS = "SET_DATAIKU_RESULTS";
export const SET_PREVIOUS_MODEL = "SET_PREVIOUS_MODEL";
export const RESET_APP = "RESET_APP";

/**
 * ACTION FUNCTIONS
 */
export const resetApp = () => ({
  type: RESET_APP,
});
export const getData = (payload) => ({
  type: GET_DATA,
  payload,
  promise: () => fetchData(),
});

export const setMetricsOrder = (payload) => ({
  type: SET_METRICS_ORDER,
  payload,
});

export const setPrivacyVariables = (payload) => ({
  type: SET_PRIVACY_VARIABLES,
  payload,
});

export const addFilters = (payload) => ({
  type: ADD_FILTERS,
  payload,
});

export const setChoosenModel = (payload, iterationNumber) => ({
  type: SET_CHOOSEN_MODEL,
  payload,
  iterationNumber,
});

export const setDataikuResults = (payload) => ({
  type: SET_DATAIKU_RESULTS,
  payload,
});

export const setPreviousModel = (payload) => ({
  type: SET_PREVIOUS_MODEL,
  payload,
});

/**
 * REDUCER
 */
const defaultPrivacyVariables = variables.reduce(
  (res, { relates_to_privacy, id }) => ({
    ...res,
    [id]: relates_to_privacy,
  }),
  {}
);

const DEFAULT_STATE = {
  models: [],
  metricsOrder: [...metrics.filter((m) => m.iteration === 0)],
  filters: {},
  choosenModel: undefined,
  dataikuResults: {},
  privacyVariables: defaultPrivacyVariables,
  previousModel: undefined,
  choosenModels: {},
};

function data(state = DEFAULT_STATE, action) {
  const { payload, result } = action;
  switch (action.type) {
    case RESET_APP:
      return {
        ...DEFAULT_STATE,
        models: state.models,
      };
    case `${GET_DATA}`:
      return state;
    case `${GET_DATA}_SUCCESS`:
      return {
        ...state,
        models: result,
      };
    case `${GET_DATA}_ERROR`:
      return state;
    case SET_PRIVACY_VARIABLES:
    case SET_METRICS_ORDER:
    case SET_PREVIOUS_MODEL:
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
    case SET_DATAIKU_RESULTS:
      return setPropInState(action.type, payload, state);
    case SET_CHOOSEN_MODEL:
      return {
        ...state,
        choosenModel: payload,
        choosenModels: {
          ...state.choosenModels,
          [action.iterationNumber]: payload,
        },
      };
    // setPropInState(action.type, payload, state);
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
const dataikuResults = (state) => state.dataikuResults;
const privacyVariables = (state) => state.privacyVariables;
const previousModel = (state) => state.previousModel;
const choosenModels = (state) => choosenModels;

export const selector = createStructuredSelector({
  models,
  metricsOrder,
  filters,
  choosenModel,
  dataikuResults,
  privacyVariables,
  previousModel,
  choosenModels,
});
