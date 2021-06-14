/* eslint import/no-webpack-loader-syntax: off */
import react from "react"; /* eslint no-unused-vars : 0 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";

import provocations from "../contents/provocations.yml";
import metricsList from "../contents/metrics_list.fr.yml";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import * as historyDuck from "../state/duckHistory";
import downloadFile from "../helpers/download";
import { renderAction, renderPayload } from "../helpers/history";

// import { STEP_DATAIKU_PRACTICE } from "../constants";
import {
  STEP_METRICS_SORTING,
  STEP_FINAL_PROVOCATION_3,
  STEP_FINAL_PROVOCATION_1,
} from "../constants";

function FinalProvocationContainer({
  setCurrentStep,
  resetApp,
  setIterationNumber,
  history = [],
  data: {
    models,
    privacyVariables,
    choosenModel,
    dataikuResults,
    choosenModels,
  },
  ui: { iterationNumber, currentStep },
}) {
  const modelsCsv = `source;${metricsList.map(({ name }) => name).join(";")}
dataiku;${metricsList.map(({ id }) => dataikuResults[id]).join(";")};
${Object.entries(choosenModels)
  .map(([index, model]) => {
    return `model_${+index + 1};${metricsList
      .map(({ id, name }) => {
        const value =
          id === "Privacy"
            ? -Object.keys(privacyVariables).filter((f) => privacyVariables[f])
                .length
            : model && model[id];

        return value;
      })
      .filter((v) => v)
      .join(";")}${
      "" /*';' + Object.keys(privacyVariables)
      .filter((f) => privacyVariables[f])
    .join(", ")*/
    }`;
  })
  .join("\n")}`;

  const historyCsv = `id;heure;resume;type;new_order;filter1_type;filter1_value;filter2_type;filter2_value;choosen_model;step
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
  console.log({ choosenModels });
  return (
    <header className="header contents-wrapper">
      <div className="contents-container final-steps">
        {provocations
          .filter(
            (provocation) => provocation.iteration === iterationNumber + 1
          )
          .filter(
            (_provocation, index) =>
              index === currentStep - STEP_FINAL_PROVOCATION_1
          )
          .map(({ id, src }) => (
            <div className="provocation-image-container final-steps">
              {/* <h1>{translate("provocation_intro")}</h1> */}
              <img
                key={id}
                src={`${process.env.PUBLIC_URL}/images/${src}`}
                alt={id}
              />
            </div>
          ))}
      </div>
      {currentStep < STEP_FINAL_PROVOCATION_3 ? (
        <div className="final-steps-buttons-container">
          <button
            onClick={() => {
              setCurrentStep(currentStep + 1);
            }}
          >
            {translate("new_iteration")}
          </button>
        </div>
      ) : (
        <div className="final-steps-buttons-container">
          <button onClick={() => downloadFile(modelsCsv, "csv", "models")}>
            {translate("download_models")}
          </button>
          <button onClick={() => downloadFile(historyCsv, "csv", "history")}>
            {translate("download_history")}
          </button>
          <button
            onClick={() => {
              resetApp();
              setIterationNumber(0);
              setCurrentStep(0);
            }}
          >
            {translate("restart")}
          </button>
        </div>
      )}
    </header>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state,
  ...uiDuck.selector(state.ui),
  ...dataDuck.selector(state.data),
  ...historyDuck.selector(state.history),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...uiDuck,
      ...dataDuck,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalProvocationContainer);
