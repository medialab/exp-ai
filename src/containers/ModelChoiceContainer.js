import react, { useState } from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cx from "classnames";

import translate from "../helpers/translate";
import { filterModels } from "../helpers/filters";
import { sortModelsByDistance } from "../helpers/sorters";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";

import "./ModelChoiceContainer.scss";

import metricsList from "../contents/metrics_list.fr.yml";
import MiniGraph from "../components/MiniGraph";
import ContinueButton from "../components/ContinueButton";
import ReactTooltip from "react-tooltip";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

function ModelChoiceContainer({
  ui: { currentStep },
  data: { models, filters, choosenModel, privacyVariables, metricsOrder },
  setChoosenModel,
  setCurrentStep,
  addFilters,
}) {
  const [selectedNodeId, setSelectedNodeId] = useState(undefined);
  const [sortMode, setSortMode] = useState("similarity");
  const [highlightedNodeId, setHighlightedNodeId] = useState(undefined);
  const previousExtents = [
    [0, 1],
    [2, 3],
    [3, 4],
  ];

  let visibleModels = filterModels(
    models,
    Object.entries(filters).map(([_key, filter]) => filter)
  );
  const colorScales = metricsList.reduce((res, { id }) => {
    const range = extent(visibleModels, (d) => +d[id]);
    const scale = scaleLinear().domain(range).range(["red", "green"]);
    return {
      ...res,
      [id]: scale,
    };
  }, {});
  const normalScales = metricsList.reduce((res, { id }) => {
    const range = extent(visibleModels, (d) => +d[id]);
    const scale = scaleLinear().domain(range).range([0, 1]);
    return {
      ...res,
      [id]: scale,
    };
  }, {});

  let sortItems;
  if (sortMode === "similarity") {
    sortItems = (a, b) =>
      sortModelsByDistance(
        a,
        b,
        metricsOrder.map(({ id }) => id),
        normalScales
      );
  } else {
    sortItems = (a, b) => {
      if (+a[sortMode] > +b[sortMode]) {
        return -1;
      } else if (+a[sortMode] < +b[sortMode]) {
        return 1;
      }
      return 0;
    };
  }

  visibleModels = visibleModels.sort(sortItems);

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
                    fromName: metricsOrder.find(
                      ({ id }) => id === filters[from + ""].variable
                    ).name,
                    toName: metricsOrder.find(
                      ({ id }) => id === filters[to + ""].variable
                    ).name,
                    variables: theseVariables,
                    choosenModel,
                    highlightedNodeId: highlightedNodeId || selectedNodeId,
                    addFilters,
                    filterModels,
                  }}
                />
              );
            })}
          </div>
        </aside>
        <main className="column is-main">
          <div>
            <span>{translate("sort_by")}</span>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value)}
            >
              <option value="similarity">{translate("similarity")}</option>
              {metricsOrder.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <table className="model-choice-table">
            <thead>
              <tr>
                <th></th>
                {metricsOrder.map(({ name, id }) => (
                  <th key={id}>
                    <div>
                      <span>{name}</span>
                    </div>
                  </th>
                ))}
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
                      if (model.id === selectedNodeId) {
                        setChoosenModel(model);
                        setCurrentStep(currentStep + 1);
                      } else {
                        setSelectedNodeId(model.id);
                      }
                    }}
                    className={cx("model-row", {
                      "is-active": choosenModel
                        ? model.id === highlightedNodeId ||
                          model.id === choosenModel.id
                        : model.id === highlightedNodeId,
                      "is-selected": model.id === selectedNodeId,
                    })}
                  >
                    <th>
                      <button>
                        {model.id === selectedNodeId
                          ? translate("validate")
                          : translate("select_model")}
                      </button>
                    </th>
                    {metricsOrder.map(({ name, id }) => {
                      let tip = name + " : " + model[id];
                      if (id === "privacy") {
                        tip =
                          name +
                          " : " +
                          -model.variables.filter(
                            (vName) => privacyVariables[vName]
                          ).length;
                      } else if (id === "interpretability") {
                        tip =
                          name +
                          " : " +
                          model[id] +
                          "<br/> variables utilisées : " +
                          model.variables.join(", ");
                      }
                      return (
                        <th
                          key={id}
                          data-for="table-tooltip"
                          data-tip={tip}
                          data-html={true}
                          style={{
                            background: colorScales[id](+model[id]),
                          }}
                        >
                          {id === "interpretability"
                            ? model.variables.length
                            : (model[id] ? +model[id] : 0).toFixed(2)}
                        </th>
                      );
                    })}
                    <ReactTooltip id="table-tooltip" />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
        <ContinueButton
          disabled={!selectedNodeId}
          onSubmit={() => {
            if (selectedNodeId) {
              setChoosenModel(models.find(({ id }) => id === selectedNodeId));
              setCurrentStep(currentStep + 1);
            }
          }}
          onSetCurrentStep={setCurrentStep}
          currentStep={currentStep}
          backwardEnabled
        />
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
