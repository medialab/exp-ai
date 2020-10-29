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

function SecondChoiceScreen({
  ui: { currentStep, numberOfSteps, mainChoiceIsValidated },
  data: { metricsOrder, models, filters },
  setCurrentStep,
  setNumberOfSteps,
  setMainChoiceIsValidated,
  addFilters,
  updateFilter,
}) {
  const handleSubmit = (theseFilters) => {
    const [filter1, filter2] = theseFilters;
    addFilters({
      2: filter1,
      3: filter2,
    });
    setMainChoiceIsValidated(true);
    setNumberOfSteps(7);
  };
  let firstFilteredVariables = [filters["0"], filters["1"]].find(
    (f) => f.variables
  );
  firstFilteredVariables = firstFilteredVariables
    ? firstFilteredVariables.variables
    : undefined;
  return (
    <section className="main-choice-screen">
      <h1>{translate("second_choice_screen_title")}</h1>
      <p>{translate("second_choice_screen_intro")}</p>
      {/* mini scatterplot for previous steps */}
      <BrushableScatterPlot
        data={models}
        xVariable={filters["0"].variable}
        yVariable={filters["1"].variable}
        filteredVariables={firstFilteredVariables}
        brush={{
          x: filters["0"].range,
          y: filters["1"].range,
        }}
        readOnly
        minified
        width={200}
        height={200}
        onBrushChange={({
          x: [thatXMin, thatXMax],
          y: [thatYMin, thatYMax],
        }) => {
          addFilters({
            0: { ...filters["0"], range: [thatXMin, thatXMax] },
            1: { ...filters["1"], range: [thatYMin, thatYMax] },
          });
        }}
      />
      <MetricsCrossingIndicator
        metrics={metricsOrder.map((m, i) => ({
          ...m,
          active: i === 2 || i === 3,
        }))}
      />
      <FilterForm
        metrics={metricsOrder.slice(2, 4)}
        models={filterModels(
          models,
          Object.entries(filters).map(([_key, filter]) => filter)
        )}
        onSubmit={handleSubmit}
        values={
          filters["2"] && filters["3"]
            ? [filters["2"], filters["3"]]
            : undefined
        }
      />
      <ContinueButton
        disabled={!mainChoiceIsValidated || numberOfSteps <= 7}
        onClick={() => setCurrentStep(currentStep + 1)}
      />
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
