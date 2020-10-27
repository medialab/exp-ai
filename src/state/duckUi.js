// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";
import { setPropInState } from "../helpers/stateHelpers";
/**
 * ACTION NAMES
 */
const SET_CURRENT_STEP = "SET_CURRENT_STEP";
const SET_NUMBER_OF_STEPS = "SET_NUMBER_OF_STEPS";

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

/**
 * REDUCER
 */
const DEFAULT_STATE = {
  currentStep: 0,
  numberOfSteps: 3,
};

function ui(state = DEFAULT_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_CURRENT_STEP:
    case SET_NUMBER_OF_STEPS:
      return setPropInState(action.type, payload, state);
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

export const selector = createStructuredSelector({
  currentStep,
  numberOfSteps,
});
