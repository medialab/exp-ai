import React, {
  useState,
  useEffect,
} from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";
import { filterModels } from "../helpers/filters";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import MetricsCrossingIndicator from "../components/MetricsCrossingIndicator";

import FilterForm from "../components/FilterForm";

import {
  STEP_MAIN_CHOICE,
  STEP_SECONDARY_CHOICE_1,
  STEP_SECONDARY_CHOICE_2,
  STEP_MODEL_CHOICE,
} from "../constants";
import MiniGraph from "../components/MiniGraph";

function SecondChoiceContainer({
  data: { metricsOrder, models, filters, privacyVariables = {} },
  ui: { iterationNumber },
  setCurrentStep,
  setMainChoiceIsValidated,
  addFilters,
  metricsExtent: [fromMetric, toMetric] = [1, 2],
  previousExtents = [],
  nextStep = STEP_SECONDARY_CHOICE_2,
  currentStep,
}) {
  const [tempFilters, setTempFilters] = useState(filters);
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleSubmit = (theseFilters) => {
    const [filter1, filter2] = theseFilters;
    // changing just the changed elements
    const toUpdate = Object.entries(tempFilters).reduce((res, [id, filter]) => {
      const { range } = filter;
      if (
        !filters[id] ||
        (filters[id] &&
          filters[id].range[0] !== filter.range[0] &&
          filters[id].range[1] !== filter.range[1])
      ) {
        return {
          ...res,
          [id]: filter,
        };
      }
      return res;
    }, {});

    addFilters(toUpdate);
    setMainChoiceIsValidated(true);
    const remainingVariablesNumber =
      metricsOrder.length - (currentStep - STEP_SECONDARY_CHOICE_1) - 3;
    if (remainingVariablesNumber) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(STEP_MODEL_CHOICE);
    }
  };
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!Object.keys(filters).length) return null;

  const handleMainChange = ([filter1, filter2]) => {
    setTempFilters({
      ...tempFilters,
      [fromMetric + ""]: filter1,
      [toMetric + ""]: filter2,
    });
  };

  return (
    <section className="second-choice-screen">
      <h1 className="step-title">{translate("second_choice_screen_title")}</h1>
      <div className="columns-container">
        <aside className="column is-aside">
          <p className="instructions">
            {translate("second_choice_screen_intro")}
          </p>
          <MetricsCrossingIndicator
            metrics={metricsOrder
              .filter((m) => m.iteration <= iterationNumber)
              .map((m, i) => ({
                ...m,
                active: i >= fromMetric && i <= toMetric,
              }))}
          />
          <h4>Vos arbitrages précédents :</h4>
          {/* mini scatterplots for previous steps */}
          <div className="mini-graphs-wrapper">
            {previousExtents
              .filter(
                ([from, to]) =>
                  tempFilters[from + ""] !== undefined &&
                  tempFilters[to + ""] !== undefined
              )
              .map(([from, to], index) => {
                // console.log({ from, to });
                let theseVariables = [
                  tempFilters[from + ""],
                  tempFilters[to + ""],
                ].find((f) => f && f.variables);
                theseVariables = theseVariables
                  ? theseVariables.variables
                  : undefined;
                const handleNav = () => {
                  let target;
                  switch (index) {
                    case 0:
                      target = STEP_MAIN_CHOICE;
                      break;
                    case 1:
                      target = STEP_SECONDARY_CHOICE_1;
                      break;
                    case 2:
                    default:
                      target = STEP_SECONDARY_CHOICE_2;
                      break;
                  }
                  setCurrentStep(target);
                };
                return (
                  <MiniGraph
                    key={index}
                    {...{
                      index,
                      filters: tempFilters,
                      models,
                      fromName: metricsOrder.find(
                        ({ id }) =>
                          filters[from + ""] &&
                          id === filters[from + ""].variable
                      ).name,
                      toName: metricsOrder.find(
                        ({ id }) =>
                          filters[to + ""] && id === filters[to + ""].variable
                      ).name,
                      onNav: handleNav,
                      from,
                      to,
                      variables: theseVariables,
                      addFilters: (f) =>
                        setTempFilters({ ...tempFilters, ...f }),
                      filterModels,
                    }}
                  />
                );
              })}
          </div>
        </aside>
        <main className="column is-main">
          <FilterForm
            metrics={metricsOrder.slice(fromMetric, toMetric + 1)}
            models={filterModels(
              models,
              Object.entries(tempFilters)
                .filter(([key]) => +key < fromMetric)
                .map(([_key, filter]) => filter)
            )}
            onSubmit={handleSubmit}
            onPreviousStep={handlePreviousStep}
            privacyVariables={privacyVariables}
            onChange={handleMainChange}
            values={
              tempFilters[fromMetric + ""] || tempFilters[toMetric + ""]
                ? [tempFilters[fromMetric + ""], tempFilters[toMetric + ""]]
                : undefined
            }
          />
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
)(SecondChoiceContainer);
