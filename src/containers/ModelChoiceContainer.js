import react, {
  useState,
  useEffect,
} from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cx from "classnames";

import translate from "../helpers/translate";
import { filterModels } from "../helpers/filters";
import { useDebounce } from "../helpers/hooks";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";

import { DECIMALS } from "../constants";

import "./ModelChoiceContainer.scss";

import metricsList from "../contents/metrics_list.fr.yml";
import MiniGraph from "../components/MiniGraph";
import ContinueButton from "../components/ContinueButton";
import ReactTooltip from "react-tooltip";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

import worker from "workerize-loader!../worker"; // eslint-disable-line import/no-webpack-loader-syntax

const workerInstance = worker();

const DISPLAY_FILTER_STEP = 30;

function ModelChoiceContainer({
  ui: { currentStep },
  data: { models, filters, choosenModel, privacyVariables, metricsOrder },
  setChoosenModel,
  step,
  setCurrentStep,
  previousStep,
  addFilters,
}) {
  const [selectedNodeId, setSelectedNodeId] = useState(undefined);
  const [sortMode, setSortMode] = useState("similarity");
  const [highlightedNodeId, setHighlightedNodeId] = useState(undefined);
  const [visibleModels, setVisibleModels] = useState(undefined);
  const [displayFilter, setDisplayFilter] = useState(DISPLAY_FILTER_STEP);
  const previousExtents = [
    [0, 1],
    [1, 2],
    [2, 3],
    // [3, 4],
  ];

  useEffect(() => {
    workerInstance.addEventListener("message", (message) => {
      if (message.data.type === "RPC" && message.data.result) {
        setDisplayFilter(DISPLAY_FILTER_STEP);
        setVisibleModels(message.data.result);
      }
    });
  }, []);

  useEffect(() => {
    setVisibleModels(undefined);
    if (currentStep === step) {
      setTimeout(() => {
        workerInstance.getVisibleModels({
          models,
          filters,
          sortMode,
          metricsOrder,
        });
      });
    }
  }, [filters, sortMode, metricsOrder, currentStep, step, models]);

  if (!Object.keys(filters).length) return null;

  let colorScales;
  if (visibleModels) {
    colorScales = metricsList.reduce((res, { id }) => {
      // relative scaling
      let range = extent(visibleModels, (d) =>
        parseFloat(d[id]).toFixed(DECIMALS)
      );
      // absolute scaling
      // let range = extent(models, (d) => +d[id]);
      let mapping = ["red", "green"];
      if (["disparate_impact"].includes(id)) {
        range = extent(models, (d) => Math.abs(1 - +d[id]));
      }
      const scale = scaleLinear().domain(range).range(mapping);
      return {
        ...res,
        [id]: scale,
      };
    }, {});
  }

  const handleViewMore = () => {
    setDisplayFilter(displayFilter + DISPLAY_FILTER_STEP);
  };

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
            {previousExtents
              .filter(
                ([from, to]) =>
                  filters[from + ""] !== undefined &&
                  filters[to + ""] !== undefined
              )
              .map(([from, to], index) => {
                let theseVariables = [
                  filters[from + ""],
                  filters[to + ""],
                ].find((f) => f && f.variables);
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
          {visibleModels ? (
            <table className="model-choice-table">
              <thead>
                <tr>
                  <th></th>
                  {metricsOrder.map(({ name, id }) => (
                    <th key={id}>
                      <span>
                        <span>{name}</span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                onMouseLeave={() => {
                  setHighlightedNodeId(undefined);
                }}
              >
                {visibleModels.slice(0, displayFilter).map((model) => {
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
                        let val = (+model[id]).toFixed(2);
                        if (id === "privacy") {
                          val = -model.variables.filter(
                            (vName) => privacyVariables[vName]
                          ).length;
                        }
                        let tip = name + " : " + val;
                        if (id === "interpretability") {
                          val = parseInt(val);
                          tip =
                            name +
                            " : " +
                            val +
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
                              background:
                                id === "disparate_impact"
                                  ? colorScales[id](
                                      Math.abs(
                                        1 -
                                          parseFloat(model[id]).toFixed(
                                            DECIMALS
                                          )
                                      )
                                    )
                                  : colorScales[id](
                                      parseFloat(model[id]).toFixed(DECIMALS)
                                    ),
                            }}
                          >
                            {val}
                          </th>
                        );
                      })}
                      <ReactTooltip id="table-tooltip" />
                    </tr>
                  );
                })}
                {displayFilter < visibleModels.length ? (
                  <div className="view-more-container">
                    <button className="view-more-btn" onClick={handleViewMore}>
                      {translate("show_more_models")} (
                      {visibleModels.length - displayFilter}{" "}
                      {translate("not_displayed")})
                    </button>
                  </div>
                ) : null}
              </tbody>
            </table>
          ) : (
            <div
              className={`loading ${currentStep === step ? "is-active" : ""}`}
            >
              <div>{translate("loading")}</div>
            </div>
          )}
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
          onPreviousStep={() => setCurrentStep(previousStep)}
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
