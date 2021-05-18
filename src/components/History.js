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

import "./History.scss";

const serializeStep = (payload) => {
  switch (payload) {
    case STEP_HEADER:
      return translate("app_header_view");
    // case STEP_DATAIKU_PRACTICE:
    //   return translate("dataiku_practice_view");
    // case STEP_EU_LEGISLATION:
    //   return translate("eu_legislation_view");
    // case STEP_METRICS_EXPLANATION_0:
    // case STEP_METRICS_EXPLANATION_1:
    // case STEP_METRICS_EXPLANATION_2:
    // case STEP_METRICS_EXPLANATION_3:
    // case STEP_METRICS_EXPLANATION_4:
    // case STEP_METRICS_EXPLANATION_5:
    //   return translate("metrics_explanation_view");
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
    case STEP_CONCLUSION:
      return translate("conclusion_view");
    default:
      return "";
  }
};

const actionsSerialization = {
  START_APP: {
    payload: () => ({}),
    description: (payload) => translate("started_the_app"),
  },
  SET_METRICS_ORDER: {
    payload: (payload) => ({
      new_order: payload.map(({ id }) => id).join(", "),
    }),
    description: (payload) =>
      translate("changed_metrics_order_to") +
      " " +
      payload.map((i, index) => index + 1 + "/ " + i.name).join(", "),
  },
  ADD_FILTERS: {
    payload: (payload = {}) => {
      if (Object.entries(payload).length === 0) {
        return 0;
      } else if (Object.entries(payload).length === 1) {
        const [
          [_key1, { variable: variable1, range: range1 }],
        ] = Object.entries(payload);
        return {
          filter1_type: variable1,
          filter1_value: range1.join(", "),
        };
      }
      const [
        [_key1, { variable: variable1, range: range1 }],
        [_key2, { variable: variable2, range: range2 }],
      ] = Object.entries(payload);
      return {
        filter1_type: variable1,
        filter1_value: range1.join(", "),
        filter2_type: variable2,
        filter2_value: range2.join(", "),
      };
    },
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
    payload: () => ({}),
    description: () => translate("set_dataiku_results"),
  },
  SET_ITERATION_NUMBER: {
    // payload: (payload) => ({
    //   iterationNumber: payload.iterationNumber
    // }),
    payload: (payload) => payload,
    description: (iterationNumber) =>
      translate("set_iteration_number") + (+iterationNumber + 1),
  },
  SET_CHOOSEN_MODEL: {
    payload: (payload) => ({
      choosen_model: payload.variables.join("/"),
    }),
    description: (payload) =>
      translate("set_choosen_model") + " : " + payload.variables.join("/"),
  },
  SET_CURRENT_STEP: {
    payload: (payload) => ({ step: serializeStep(payload) }),
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
  const renderPayload = (action) => {
    if (actionsSerialization[action.type]) {
      return actionsSerialization[action.type].payload(action.payload);
    }
    return "nope";
  };

  const csv = `id;heure;resume;type;new_order;filter1_type;filter1_value;filter2_type;filter2_value;choosen_model;step
${history
  .map(({ action, date }, index) => {
    const resume = renderAction(action, date, index);
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
                <div className="date-container">
                  <code>{new Date(date).toLocaleTimeString()}</code>
                </div>
                <div>{renderAction(action, date, index)}</div>
              </li>
            );
          })}
      </ul>
      <div>
        <button onClick={() => downloadFile(csv, "csv", "history")}>
          {translate("download_history")}
        </button>
      </div>
    </div>
  );
}

export default History;
