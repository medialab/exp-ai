import react from "react"; /* eslint no-unused-vars : 0 */
import translate from "../helpers/translate";

import {
  SET_METRICS_ORDER,
  ADD_FILTERS,
  SET_DATAIKU_RESULTS,
  SET_CHOOSEN_MODEL,
} from "../state/duckData";

import { SET_CURRENT_STEP, START_APP } from "../state/duckUi";
import {
  STEP_HEADER,
  // STEP_DATAIKU_PRACTICE,
  // STEP_EU_LEGISLATION,
  // STEP_METRICS_EXPLANATION_0,
  // STEP_METRICS_EXPLANATION_1,
  // STEP_METRICS_EXPLANATION_2,
  // STEP_METRICS_EXPLANATION_3,
  // STEP_METRICS_EXPLANATION_4,
  // STEP_METRICS_EXPLANATION_5,
  STEP_METRICS_SORTING,
  STEP_MAIN_CHOICE,
  STEP_SECONDARY_CHOICE_1,
  STEP_SECONDARY_CHOICE_2,
  STEP_MODEL_CHOICE,
  STEP_CONCLUSION,
} from "../constants";
import downloadFile from "../helpers/download";
import {
  renderAction,
  renderPayload,
  actionsSerialization,
} from "../helpers/history";

import metricsList from "../contents/metrics_list.fr.yml";
import variablesList from "../contents/variables_list.fr.yml";

import "./History.scss";
import FileSaver from "file-saver";
import MiniGraph from "./MiniGraph";

function History({ history = [], models }) {
  const csv = `id;heure;resume;type;new_order;filter1_type;filter1_value;filter2_type;filter2_value;choosen_model;step
${history
  .map(({ action, date }, index) => {
    const resume = renderAction(action, date, index, models);
    const {
      new_order = "",
      filter1_type = "",
      filter1_value = "",
      filter2_type = "",
      filter2_value = "",
      choosen_model = "",
      step = "",
    } = renderPayload(action);
    return `id;${new Date(date).toLocaleTimeString()};${resume};${
      action.type
    };${new_order};${filter1_type};${filter1_value};${filter2_type};${filter2_value};${choosen_model};${step}`;
  })
  .join("\n")}`;
  return (
    <div className="history">
      <ul className="history-details">
        {history
          .filter(
            ({ action }) =>
              ![
                "START_APP",
                "SET_CURRENT_STEP",
                "SET_DATAIKU_RESULTS",
              ].includes(action.type)
          )
          .map(({ action, date }, index) => {
            return (
              <li className="history-item" key={index}>
                <div
                  title={new Date(date).toLocaleTimeString()}
                  className="action-symbol-container"
                >
                  <span className="action-symbol">
                    {actionsSerialization[action.type].symbol || "⟳"}
                  </span>
                  {/* <code>{new Date(date).toLocaleTimeString()}</code> */}
                </div>
                <div className="step-description-container">
                  {renderAction(action, date, index, models)}
                </div>
              </li>
            );
          })}
      </ul>
      {/* <div>
        <button onClick={() => downloadFile(csv, "csv", "history")}>
          {translate("download_history")}
        </button>
      </div> */}
    </div>
  );
}

export default History;
