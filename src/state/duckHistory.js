// import { combineReducers } from 'redux';
import { createStructuredSelector } from "reselect";

/**
 * ACTION NAMES
 */
import {
  RESET_APP,
  SET_METRICS_ORDER,
  ADD_FILTERS,
  SET_DATAIKU_RESULTS,
  SET_CHOOSEN_MODEL,
} from "./duckData";
import { SET_CURRENT_STEP, START_APP } from "./duckUi";

/**
 * ACTION FUNCTIONS
 */
/**
 * REDUCER
 */
const DEFAULT_STATE = {
  history: [],
};

function data(state = DEFAULT_STATE, action) {
  // const { payload } = action;
  switch (action.type) {
    case RESET_APP:
      return DEFAULT_STATE;
    case SET_METRICS_ORDER:
    case ADD_FILTERS:
    case SET_DATAIKU_RESULTS:
    case SET_CHOOSEN_MODEL:
    case SET_CURRENT_STEP:
    case START_APP:
      return {
        ...state,
        history: [
          ...state.history,
          {
            action,
            date: new Date(),
          },
        ],
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

const history = (state) => state.history;

export const selector = createStructuredSelector({
  history,
});
