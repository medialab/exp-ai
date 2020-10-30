import react, { useState } from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cx from "classnames";

import translate from "../helpers/translate";
import { filterModels } from "../helpers/filters";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import ContinueButton from "../components/ContinueButton";
import BrushableScatterPlot from "../components/BrushableScatterPlot";

import "./ModelChoiceContainer.scss";

import metricsList from "../contents/metrics_list.fr.yml";

import { STEP_DATAIKU_FEEDBACK } from "../constants";

function ModelChoiceContainer({
  ui: { numberOfSteps, mainChoiceIsValidated },
  data: { models, filters, choosenModel },
  setChoosenModel,
  setCurrentStep,
  setNumberOfSteps,
  addFilters,
  nextStep = STEP_DATAIKU_FEEDBACK,
}) {
  const [highlightedNodeId, setHighlightedNodeId] = useState(undefined);
  const previousExtents = [
    [0, 1],
    [2, 3],
    [3, 4],
  ];

  const visibleModels = filterModels(
    models,
    Object.entries(filters).map(([_key, filter]) => filter)
  );

  let privacyVariables = Object.entries(filters)
    .map(([_key, filter]) => filter)
    .find((f) => f.variables);
  privacyVariables = privacyVariables && privacyVariables.variables;
  return (
    <section className="single-choice-screen">
      <h1 className="step-title">{translate("model_choice_screen_title")}</h1>
      <div className="columns-container">
        <aside className="column is-aside">
          <p className="instructions">
            {translate("model_choice_screen_intro")}
          </p>
          {/* mini scatterplots for previous steps */}
          <div className="">
            {previousExtents.map(([from, to], index) => {
              let theseVariables = [filters[from + ""], filters[to + ""]].find(
                (f) => f.variables
              );
              theseVariables = theseVariables
                ? theseVariables.variables
                : undefined;
              return (
                <div key={index} className="mini-graph-container">
                  <h5 className="mini-graph-title">
                    <span>
                      <span className="number-indicator">{index + 1}</span>
                    </span>
                    <span>
                      <code>{filters[from + ""].variable}</code> vs{" "}
                      <code>{filters[to + ""].variable}</code>
                    </span>
                  </h5>
                  <BrushableScatterPlot
                    data={
                      from === 0
                        ? models
                        : filterModels(
                            models,
                            Object.entries(filters)
                              .filter(([key]) => +key < from)
                              .map(([_key, filter]) => filter)
                          )
                    }
                    xVariable={filters[from + ""].variable}
                    yVariable={filters[to + ""].variable}
                    filteredVariables={theseVariables}
                    brush={{
                      x: filters[from + ""].range,
                      y: filters[to + ""].range,
                    }}
                    readOnly
                    minified
                    highlightedNodeId={
                      choosenModel
                        ? highlightedNodeId || choosenModel.id
                        : highlightedNodeId
                    }
                    width={200}
                    height={200}
                    onBrushChange={({
                      x: [thatXMin, thatXMax],
                      y: [thatYMin, thatYMax],
                    }) => {
                      addFilters({
                        [from + ""]: {
                          ...filters[from + ""],
                          range: [thatXMin, thatXMax],
                        },
                        [to + ""]: {
                          ...filters[to + ""],
                          range: [thatYMin, thatYMax],
                        },
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </aside>
        <main className="column is-main">
          <table className="model-choice-table">
            <thead>
              <tr>
                {metricsList.map(({ name, id }) => (
                  <th key={id}>{name}</th>
                ))}
                <th>Variables</th>
              </tr>
            </thead>
            <tbody
              onMouseLeave={() => {
                setHighlightedNodeId(undefined);
              }}
            >
              {visibleModels.map((model) => {
                return (
                  <tr
                    key={model.id}
                    onMouseOver={() => {
                      setHighlightedNodeId(model.id);
                    }}
                    onClick={() => {
                      setChoosenModel(model);
                      setNumberOfSteps(STEP_DATAIKU_FEEDBACK + 1);
                      setCurrentStep(STEP_DATAIKU_FEEDBACK);
                    }}
                    className={cx("model-row", {
                      "is-active": choosenModel
                        ? model.id === highlightedNodeId ||
                          model.id === choosenModel.id
                        : model.id === highlightedNodeId,
                    })}
                  >
                    {metricsList.map(({ name, id }) => (
                      <th key={id}>
                        {id === "Privacy" && privacyVariables
                          ? -model.variables.filter((vName) =>
                              privacyVariables.includes(vName)
                            ).length
                          : model[id]}
                      </th>
                    ))}
                    <th>{model.variables.join(", ")}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>

      {/* <ContinueButton
        disabled={!mainChoiceIsValidated || numberOfSteps <= nextStep}
        onClick={() => setCurrentStep(nextStep)}
      /> */}
    </section>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state,
  ...uiDuck.selector(state.ui),
  ...dataDuck.selector(state.data),
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
)(ModelChoiceContainer);
