import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Tooltip from "react-tooltip";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import * as historyDuck from "../state/duckHistory";

import History from "../components/History";

import metricsList from "../contents/metrics_list.fr.yml";
import variablesLists from "../contents/variables_list.fr.yml";
import { STEP_METRICS_SORTING } from "../constants";
import downloadFile from "../helpers/download";
import { metricsColorMap } from "../helpers/misc";

function ConclusionContainer({
  data: {
    dataikuResults,
    choosenModel,
    filters,
    privacyVariables,
    metricsOrder,
  },
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
        <p>
          Le modèle que vous avez choisi utilise les dimensions suivantes pour
          prendre une décision :{" "}
          {choosenModel.variables
            .map(
              (thatId) => variablesLists.find(({ id }) => id === thatId).name
            )
            .map((text) => <strong>{text}</strong>)
            .reduce(
              (res, el, index) => [...res, index === 0 ? null : ", ", el],
              []
            )}
          .
        </p>
        <h2>{translate("conclusion_results_title")}</h2>
        <table className="results-table">
          {/* <thead>
            <th></th>
            <th></th>
            <th>Sans les métriques</th>
            <th></th>
            <th>Avec les métriques</th>
          </thead> */}
          <tbody>
            {metricsOrder.map(({ name, id }) => {
              const color = metricsColorMap[id];
              const dataikuResult = dataikuResults[id];
              let expResult =
                id === "privacy"
                  ? -Object.keys(privacyVariables).filter(
                      (f) => privacyVariables[f]
                    ).length
                  : choosenModel[id];
              expResult = +expResult;
              expResult = expResult.toFixed ? expResult.toFixed(2) : expResult;
              const isImproving = +expResult > +(dataikuResult || 0);
              return (
                <tr key={id}>
                  <th>
                    <span style={{ background: color }}>{name}</span>
                  </th>

                  <th>
                    <span
                      style={{
                        background: "grey",
                      }}
                    >
                      {dataikuResult}
                    </span>
                  </th>
                  <th>→</th>
                  <th>
                    <span
                      style={{
                        background: !isImproving ? "red" : "green",
                      }}
                    >
                      {expResult}
                    </span>
                  </th>
                  <th>
                    {isImproving
                      ? "Vous avez amélioré cet indicateur"
                      : "Vous avez dégradé cet indicateur"}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div className="results-container">
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
        </div> */}
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
