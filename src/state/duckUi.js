// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";
import { setPropInState } from "../helpers/stateHelpers";
/**
 * ACTION NAMES
 */
import { SET_METRICS_ORDER, RESET_APP } from "./duckData";
export const SET_CURRENT_STEP = "SET_CURRENT_STEP";
const SET_NUMBER_OF_STEPS = "SET_NUMBER_OF_STEPS";
export const SET_METRICS_ORDER_IS_VALIDATED = "SET_METRICS_ORDER_IS_VALIDATED";
export const SET_MAIN_CHOICE_IS_VALIDATED = "SET_MAIN_CHOICE_IS_VALIDATED";
export const START_APP = "START_APP";

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
export const setMainChoiceIsValidated = (payload) => ({
  type: SET_MAIN_CHOICE_IS_VALIDATED,
  payload,
});

export const startApp = (payload) => ({
  type: START_APP,
  payload,
});

/**
 * REDUCER
 */
const DEFAULT_STATE = {
  currentStep: 0,
  numberOfSteps: 5,
  metricsOrderIsValidated: false,
  mainChoiceIsValidated: false,
};

function ui(state = DEFAULT_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    case RESET_APP:
      return DEFAULT_STATE;
    case SET_CURRENT_STEP:
    case SET_NUMBER_OF_STEPS:
      return setPropInState(action.type, payload, state);
    case SET_METRICS_ORDER_IS_VALIDATED:
      return {
        ...state,
        metricsOrderIsValidated: payload,
        mainChoiceIsValidated: payload ? state.mainChoiceIsValidated : false,
      };
    case SET_MAIN_CHOICE_IS_VALIDATED:
      return {
        ...state,
        mainChoiceIsValidated: payload,
      };
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
const mainChoiceIsValidated = (state) => state.mainChoiceIsValidated;

export const selector = createStructuredSelector({
  currentStep,
  numberOfSteps,
  metricsOrderIsValidated,
  mainChoiceIsValidated,
});
