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
  STEP_DATAIKU_PRACTICE,
  STEP_EU_LEGISLATION,
  STEP_METRICS_EXPLANATION,
  STEP_METRICS_SORTING,
  STEP_MAIN_CHOICE,
  STEP_SECONDARY_CHOICE_1,
  STEP_SECONDARY_CHOICE_2,
  STEP_MODEL_CHOICE,
  STEP_DATAIKU_FEEDBACK,
  STEP_CONCLUSION,
} from "../constants";
import downloadFile from "../helpers/download";

const serializeStep = (payload) => {
  switch (payload) {
    case STEP_HEADER:
      return translate("app_header_view");
    case STEP_DATAIKU_PRACTICE:
      return translate("dataiku_practice_view");
    case STEP_EU_LEGISLATION:
      return translate("eu_legislation_view");
    case STEP_METRICS_EXPLANATION:
      return translate("metrics_explanation_view");
    case STEP_METRICS_SORTING:
      return translate("metrics_sorting_view");
    case STEP_MAIN_CHOICE:
      return translate("main_filter_view");
    case STEP_SECONDARY_CHOICE_1:
      return translate("secondary_filter_view");
    case STEP_SECONDARY_CHOICE_2:
      return translate("tertiary_filter_view");
    case STEP_MODEL_CHOICE:
      return translate("model_choice_view");
    case STEP_DATAIKU_FEEDBACK:
      return translate("dataiku_feedback_view");
    case STEP_CONCLUSION:
      return translate("conclusion_view");
    default:
      return "";
  }
};

const actionsSerialization = {
  START_APP: {
    description: (payload) => translate("started_the_app"),
  },
  SET_METRICS_ORDER: {
    description: (payload) =>
      translate("changed_metrics_order_to") +
      " " +
      payload.map((i, index) => index + 1 + "/ " + i.name).join(", "),
  },
  ADD_FILTERS: {
    description: (payload) =>
      translate("add_filters") +
      " " +
      Object.entries(payload)
        .map(
          ([_key, filter]) =>
            `${filter.variable} (entre ${filter.range[0]} et ${filter.range[1]})`
        )
        .join(" " + translate("and") + " "),
  },
  SET_DATAIKU_RESULTS: {
    description: () => translate("set_dataiku_results"),
  },
  SET_CHOOSEN_MODEL: {
    description: (payload) =>
      translate("set_choosen_model") + " : " + payload.variables.join("/"),
  },
  SET_CURRENT_STEP: {
    description: (payload) =>
      translate("navigated_to") + " " + serializeStep(payload),
  },
};

function History({ history = [] }) {
  const renderAction = (action, date, index) => {
    if (actionsSerialization[action.type]) {
      return actionsSerialization[action.type].description(action.payload);
    }
    return "nope";
  };
  const csv = `heure;action
${history
  .map(
    ({ action, date }, index) =>
      `${new Date(date).toLocaleTimeString()};${renderAction(
        action,
        date,
        index
      )}`
  )
  .join("\n")}`;
  return (
    <div className="history">
      <ul className="history-details">
        {history.map(({ action, date }, index) => {
          return (
            <li key={index}>
              <div>{new Date(date).toLocaleTimeString()}</div>
              <div>{renderAction(action, date, index)}</div>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => downloadFile(csv, "csv", "history")}>
          {translate("download")}
        </button>
      </div>
    </div>
  );
}

export default History;
