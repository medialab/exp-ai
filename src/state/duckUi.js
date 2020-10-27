// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";
import { setPropInState } from "../helpers/stateHelpers";
/**
 * ACTION NAMES
 */
import { SET_METRICS_ORDER } from "./duckData";
const SET_CURRENT_STEP = "SET_CURRENT_STEP";
const SET_NUMBER_OF_STEPS = "SET_NUMBER_OF_STEPS";
const SET_METRICS_ORDER_IS_VALIDATED = "SET_METRICS_ORDER_IS_VALIDATED";

/**
 * ACTION FUNCTIONS
 */
export const setCurrentStep = (payload) => ({
  type: SET_CURRENT_STEP,
  payload,
});

export const setNumberOfSteps = (payload) => ({
  type: SET_NUMBER_OF_STEPS,
  payload,
});
export const setMetricsOrderIsValidated = (payload) => ({
  type: SET_METRICS_ORDER_IS_VALIDATED,
  payload,
});

/**
 * REDUCER
 */
const DEFAULT_STATE = {
  currentStep: 0,
  numberOfSteps: 5,
  metricsOrderIsValidated: false,
};

function ui(state = DEFAULT_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_CURRENT_STEP:
    case SET_NUMBER_OF_STEPS:
    case SET_METRICS_ORDER_IS_VALIDATED:
      return setPropInState(action.type, payload, state);
    case SET_METRICS_ORDER:
      return {
        ...state,
        metricsOrderIsValidated: false,
      };
    default:
      return state;
  }
}

// export default combineReducers({data, ...})
export default ui;

/**
 * SELECTOR
 */

const currentStep = (state) => state.currentStep;
const numberOfSteps = (state) => state.numberOfSteps;
const metricsOrderIsValidated = (state) => state.metricsOrderIsValidated;

export const selector = createStructuredSelector({
  currentStep,
  numberOfSteps,
  metricsOrderIsValidated,
});
