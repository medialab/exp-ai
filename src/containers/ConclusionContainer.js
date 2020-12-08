import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Tooltip from "react-tooltip";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import * as historyDuck from "../state/duckHistory";

import History from "../components/History";
import InfoTip from "../components/InfoTip";

import metricsList from "../contents/metrics_list.fr.yml";
import { STEP_METRICS_SORTING } from "../constants";
import downloadFile from "../helpers/download";

function ConclusionContainer({
  data: { dataikuResults, choosenModel, filters, privacyVariables },
  history,
  resetApp,
  setCurrentStep,
}) {
  if (!choosenModel) {
    return null;
  }
  const csv = `source;${metricsList
    .map(({ name }) => name)
    .join(";")};variables considérées comme privées
dataiku;${metricsList.map(({ id }) => dataikuResults[id]).join(";")};
interface;${metricsList
    .map(({ id, name }) => {
      const value =
        id === "Privacy"
          ? -Object.keys(privacyVariables).filter((f) => privacyVariables[f])
              .length
          : choosenModel[id];

      return value;
    })
    .join(";")};${Object.keys(privacyVariables)
    .filter((f) => privacyVariables[f])
    .join(", ")}`;
  return (
    <section className="single-choice-screen">
      <h1 className="step-title">{translate("conclusion_screen_title")}</h1>
      <div className="step-section">
        <h2>{translate("conclusion_results_title")}</h2>
        <div className="results-container">
          <div className="result-container">
            <h3>{translate("first_model_dataiku")}</h3>
            <ul>
              {metricsList.map(({ id, name, short_description }) => {
                return (
                  <li key={id}>
                    <span className="label-container">
                      <code>
                        {name} <InfoTip tip={short_description} />{" "}
                      </code>
                    </span>{" "}
                    <span>{dataikuResults[id]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="result-container">
            <h3>{translate("second_model_choosen")}</h3>
            <ul>
              {metricsList.map(({ id, name, short_description }) => {
                const value =
                  id === "privacy"
                    ? -Object.keys(privacyVariables).filter(
                        (f) => privacyVariables[f]
                      ).length
                    : choosenModel[id];
                return (
                  <li key={id}>
                    <span className="label-container">
                      <code>
                        {name} <InfoTip tip={short_description} />{" "}
                      </code>
                    </span>{" "}
                    <span>{value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <button onClick={() => downloadFile(csv, "csv", "modeles_expe")}>
            {translate("download")}
          </button>
        </div>
      </div>
      <div className="step-section">
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
      <Tooltip />
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
