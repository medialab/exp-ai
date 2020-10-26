/**
 * Fonio Reducers Endpoint
 * ===================================
 *
 * Combining the app's reducers.
 */
import { combineReducers } from "redux";
import data from "./duckData";
import history from "./duckHistory";
import ui from "./duckUi";

export default combineReducers({
  data,
  history,
  ui,
});
