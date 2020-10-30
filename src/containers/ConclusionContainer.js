import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import * as historyDuck from "../state/duckHistory";

import History from "../components/History";

import metricsList from "../contents/metrics_list.fr.yml";
import { STEP_METRICS_SORTING } from "../constants";
import downloadFile from "../helpers/download";

function ConclusionContainer({
  data: { dataikuResults, choosenModel, filters },
  history,
  resetApp,
  setCurrentStep,
}) {
  let privacyVariables = Object.entries(filters)
    .map(([_key, filter]) => filter)
    .find((f) => f.variables);
  privacyVariables = privacyVariables && privacyVariables.variables;
  const csv = `source;${metricsList
    .map(({ name }) => name)
    .join(";")};variables considérées comme privées
dataiku;${metricsList.map(({ id }) => dataikuResults[id]).join(";")};
interface;${metricsList
    .map(({ id, name }) => {
      const value =
        id === "Privacy"
          ? -choosenModel.variables.filter((vName) =>
              privacyVariables.includes(vName)
            ).length
          : choosenModel[id];
      return value;
    })
    .join(";")};${privacyVariables.join(", ")}`;
  return (
    <section className="single-choice-screen">
      <h1>{translate("conclusion_screen_title")}</h1>
      <div>
        <h2>{translate("conclusion_results_title")}</h2>
        <div>
          <h3>{translate("first_model_dataiku")}</h3>
          <ul>
            {metricsList.map(({ id, name }) => {
              return (
                <li key={id}>
                  <span>{name}</span> : {dataikuResults[id]}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3>{translate("second_model_choosen")}</h3>
          <ul>
            {metricsList.map(({ id, name }) => {
              const value =
                id === "Privacy"
                  ? -choosenModel.variables.filter((vName) =>
                      privacyVariables.includes(vName)
                    ).length
                  : choosenModel[id];
              return (
                <li key={id}>
                  <span>{name}</span> : {value}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <button onClick={() => downloadFile(csv, "csv", "modeles_expe")}>
            {translate("download")}
          </button>
        </div>
      </div>
      <div>
        <h2>{translate("conclusion_history_title")}</h2>
        <History history={history} />
      </div>

      <div>
        <button
          onClick={() => {
            resetApp();
            setCurrentStep(STEP_METRICS_SORTING);
          }}
        >
          {translate("restart")}
        </button>
      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    ...state,
    ...uiDuck.selector(state.ui),
    ...dataDuck.selector(state.data),
    ...historyDuck.selector(state.history),
  };
};

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
)(ConclusionContainer);
