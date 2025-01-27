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
import {
  DECIMALS,
  STEP_METRICS_SORTING,
  STEP_INITIAL_PROVOCATION,
} from "../constants";
import downloadFile from "../helpers/download";
import { metricsColorMap } from "../helpers/misc";

import metrics from "../contents/metrics_list.fr.yml";
// import provocations from "../contents/provocations.yml";
import messages from "../contents/messages.fr.yml";

function ConclusionContainer({
  data: {
    dataikuResults,
    choosenModel,
    filters,
    privacyVariables,
    metricsOrder,
    previousModel,
    models,
  },
  ui: { iterationNumber, currentStep },
  history,
  resetApp,
  setCurrentStep,
  setIterationNumber,
  setMetricsOrder,
  setDataikuResults,
  setPreviousModel,
}) {
  if (!choosenModel) {
    return null;
  }
  const handleNewIteration = () => {
    // resetApp();
    setIterationNumber(iterationNumber + 1);
    setMetricsOrder([
      ...metrics.filter((m) => m.iteration <= iterationNumber + 1),
    ]);
    setPreviousModel(choosenModel);
    setCurrentStep(STEP_INITIAL_PROVOCATION);
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
        <h2>
          {iterationNumber === 0
            ? translate("conclusion_results_title")
            : translate("conclusion_results_title_bis")}
        </h2>
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
              const metricsToCompare = previousModel || dataikuResults;
              let previousValue = +metricsToCompare[id];
              previousValue =
                previousValue !== undefined && previousValue.toFixed
                  ? previousValue.toFixed(DECIMALS)
                  : previousValue;
              previousValue = +previousValue;
              // original value >
              // let dataikuResult = dataikuResults[id];
              let dataikuResult = metricsToCompare[id];
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
              expResult = expResult.toFixed
                ? expResult.toFixed(DECIMALS)
                : expResult;
              expResult = +expResult;
              // dataikuResult = +dataikuResult;
              let isImproving;
              if (id.includes(["disparate"])) {
                if (previousValue > 1) {
                  if (previousValue < expResult) {
                    isImproving = "-1";
                  } else {
                    if (expResult > 1) {
                      isImproving = "1";
                    } else {
                      isImproving = "-1";
                    }
                  }
                } else {
                  if (previousValue > expResult) {
                    isImproving = "-1";
                  } else {
                    isImproving = "1";
                  }
                }
              }
              if (expResult > previousValue) {
                isImproving = "1";
              } else if (expResult < previousValue) {
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
              const theseMessages = {
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
                        {previousModel !== undefined && previousModel[id] ? (
                          <span>{previousValue}</span>
                        ) : (
                          /*previousModel ? (
                          <span>{previousModel[id]}</span>
                        )*/ <DebouncedInput
                            placeholder={`entrez vous résultats pour la métrique ${id}`}
                            value={metricsToCompare[id] || ""}
                            onChange={handleDataikuInputChange}
                          />
                        )}
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
                      ? theseMessages[isImproving]
                      : "pas de valeur à comparer"}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div>
          <button onClick={() => downloadFile(csv, "csv", "modeles_expe")}>
            {translate("download")}
          </button>
        </div> */}
      </div>
      <div className="step-section">
        <h2>{translate("conclusion_history_title")}</h2>
        <History
          iterationNumber={iterationNumber}
          history={history}
          models={models}
        />
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
      {/* <div className="provocation-image-container-in-conclusion">
        <h1>{messages.provocation_intro}</h1>
        {provocations
          .filter(
            (provocation) => provocation.iteration === iterationNumber + 1
          )
          .map(({ id, src }) => (
            <img
              key={src}
              src={`${process.env.PUBLIC_URL}/images/${src}`}
              alt={id}
            />
          ))}
      </div> */}

      {iterationNumber < 2 ? (
        <div>
          <button
            onClick={() => {
              handleNewIteration();
            }}
          >
            {translate("new_iteration")}
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setCurrentStep(currentStep + 1);
              // resetApp();
              // setIterationNumber(0);
              // setCurrentStep(0);
            }}
          >
            {translate("new_iteration")}
          </button>
        </div>
      )}

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
