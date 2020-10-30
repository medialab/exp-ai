import react from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";
import { filterModels } from "../helpers/filters";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import ContinueButton from "./ContinueButton";
import MetricsCrossingIndicator from "./MetricsCrossingIndicator";

import FilterForm from "./FilterForm";
import BrushableScatterPlot from "./BrushableScatterPlot";

import { STEP_SECONDARY_CHOICE_2 } from "../constants";

function SecondChoiceScreen({
  ui: { currentStep, numberOfSteps, mainChoiceIsValidated },
  data: { metricsOrder, models, filters },
  setCurrentStep,
  setNumberOfSteps,
  setMainChoiceIsValidated,
  addFilters,
  metricsExtent: [fromMetric, toMetric] = [2, 3],
  previousExtents = [],
  nextStep = STEP_SECONDARY_CHOICE_2,
}) {
  const handleSubmit = (theseFilters) => {
    const [filter1, filter2] = theseFilters;
    addFilters({
      [fromMetric + ""]: filter1,
      [toMetric + ""]: filter2,
    });
    setMainChoiceIsValidated(true);
    setNumberOfSteps(nextStep + 1);
    setCurrentStep(nextStep);
  };

  return (
    <section className="second-choice-screen">
      <h1>{translate("second_choice_screen_title")}</h1>
      <p>{translate("second_choice_screen_intro")}</p>
      {/* mini scatterplots for previous steps */}
      {previousExtents.map(([from, to], index) => {
        let theseVariables = [filters[from + ""], filters[to + ""]].find(
          (f) => f.variables
        );
        theseVariables = theseVariables ? theseVariables.variables : undefined;
        return (
          <BrushableScatterPlot
            key={index}
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
            minified
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
                [to + ""]: { ...filters[to + ""], range: [thatYMin, thatYMax] },
              });
            }}
          />
        );
      })}

      <MetricsCrossingIndicator
        metrics={metricsOrder.map((m, i) => ({
          ...m,
          active: i >= fromMetric && i <= toMetric,
        }))}
      />
      <FilterForm
        metrics={metricsOrder.slice(fromMetric, toMetric + 1)}
        models={filterModels(
          models,
          Object.entries(filters)
            .filter(([key]) => +key < fromMetric)
            .map(([_key, filter]) => filter)
        )}
        onSubmit={handleSubmit}
        values={
          filters[fromMetric + ""] && filters[toMetric + ""]
            ? [filters[fromMetric + ""], filters[toMetric + ""]]
            : undefined
        }
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondChoiceScreen);
