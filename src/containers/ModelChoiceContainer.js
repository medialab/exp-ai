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
import MiniGraph from "../components/MiniGraph";

function ModelChoiceContainer({
  ui: { mainChoiceIsValidated, currentStep },
  data: { models, filters, choosenModel, privacyVariables },
  setChoosenModel,
  setCurrentStep,
  addFilters,
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

  if (!Object.keys(filters).length) return null;
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
                (f) => f && f.variables
              );
              theseVariables = theseVariables
                ? theseVariables.variables
                : undefined;
              return (
                <MiniGraph
                  key={index}
                  {...{
                    index,
                    filters,
                    models,
                    from,
                    to,
                    variables: theseVariables,
                    choosenModel,
                    highlightedNodeId,
                    addFilters,
                    filterModels,
                  }}
                />
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
                      setCurrentStep(currentStep + 1);
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
                          ? -model.variables.filter(
                              (vName) => privacyVariables[vName]
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
