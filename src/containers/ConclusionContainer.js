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
import DebouncedInput from "../components/DebouncedInput";

import metricsList from "../contents/metrics_list.fr.yml";
import variablesLists from "../contents/variables_list.fr.yml";
import { STEP_METRICS_SORTING } from "../constants";
import downloadFile from "../helpers/download";
import { metricsColorMap } from "../helpers/misc";

import metrics from "../contents/metrics_list.fr.yml";

function ConclusionContainer({
  data: {
    dataikuResults,
    choosenModel,
    filters,
    privacyVariables,
    metricsOrder,
  },
  ui: { iterationNumber },
  history,
  resetApp,
  setCurrentStep,
  setIterationNumber,
  setMetricsOrder,
  setDataikuResults,
}) {
  if (!choosenModel) {
    return null;
  }

  const handleNewIteration = () => {
    setMetricsOrder([
      ...metrics.filter((m) => m.iteration <= iterationNumber + 1),
    ]);
    setIterationNumber(iterationNumber + 1);
    setCurrentStep(STEP_METRICS_SORTING);
  };
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
            {metricsOrder.map(({ name, id, short_description }) => {
              const color = metricsColorMap[id];
              let dataikuResult = dataikuResults[id];
              // reverse for special cases
              if (["privacy", "interpretability"].includes(id)) {
                dataikuResult = -dataikuResult;
              }
              let expResult =
                id === "privacy"
                  ? -Object.keys(privacyVariables).filter(
                      (f) => privacyVariables[f]
                    ).length
                  : choosenModel[id];
              expResult = +expResult;
              expResult = expResult.toFixed ? expResult.toFixed(2) : expResult;
              expResult = +expResult;
              dataikuResult = +dataikuResult;
              let isImproving;
              if (expResult > dataikuResult) {
                isImproving = "1";
              } else if (expResult < dataikuResult) {
                isImproving = "-1";
              } else {
                isImproving = "0";
              }
              // special case
              if (["fairness_accuracy"].includes(id)) {
                isImproving = -+isImproving + "";
              }
              const colors = {
                1: "green",
                "-1": "red",
                0: "grey",
              };
              const messages = {
                1: "Vous avez amélioré cet indicateur",
                "-1": "Vous avez dégradé cet indicateur",
                0: "Cet indicateur est resté identique",
              };

              const handleDataikuInputChange = (e) => {
                const value = e.target.value.replace(",", ".");
                setDataikuResults({
                  ...dataikuResults,
                  [id]: value,
                });
              };
              return (
                <tr key={id}>
                  <th>
                    <span
                      className="tag metric-name"
                      style={{ background: color }}
                    >
                      <span>
                        {name}
                        <InfoTip
                          tip={short_description}
                          data-place="right"
                          data-effect="solid"
                        />
                      </span>
                    </span>
                  </th>

                  <th>
                    <span
                      className="tag"
                      style={{
                        background: "grey",
                      }}
                    >
                      {/* {dataikuResult !== undefined && !isNaN(dataikuResult)
                        ? dataikuResult
                        : translate("no_value")} */}
                      <form>
                        <DebouncedInput
                          placeholder={`entrez vous résultats pour la métrique ${id}`}
                          value={dataikuResults[id] || ""}
                          onChange={handleDataikuInputChange}
                        />
                      </form>
                    </span>
                  </th>
                  <th>→</th>
                  <th>
                    <span
                      className="tag"
                      style={{
                        background: colors[isImproving],
                      }}
                    >
                      {expResult}
                    </span>
                  </th>
                  <th>
                    {dataikuResult !== undefined && !isNaN(dataikuResult)
                      ? messages[isImproving]
                      : "pas de valeur à comparer"}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
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

      {/* <div>
        <button
          onClick={() => {
            resetApp();
            setCurrentStep(STEP_METRICS_SORTING);
          }}
        >
          {translate("restart")}
        </button>
      </div> */}
      <div>
        <button
          onClick={() => {
            handleNewIteration();
          }}
        >
          {translate("new_iteration")}
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
