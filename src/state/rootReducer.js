/**
 * Fonio Reducers Endpoint
 * ===================================
 *
 * Combining the app's reducers.
 */
import { combineReducers } from "redux";
import { rememberReducer } from "redux-remember";
import data from "./duckData";
import history from "./duckHistory";
import ui from "./duckUi";

export default rememberReducer(
  combineReducers({
    data,
    history,
    ui,
  })
);
