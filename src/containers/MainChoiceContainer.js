import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import MetricsCrossingIndicator from "../components/MetricsCrossingIndicator";

import FilterForm from "../components/FilterForm";
import { STEP_SECONDARY_CHOICE_1 } from "../constants";

function MainChoiceContainer({
  data: { metricsOrder, models, filters },
  setCurrentStep,
  setNumberOfSteps,
  setMainChoiceIsValidated,
  addFilters,
  currentStep,
}) {
  const handleSubmit = (theseFilters) => {
    const [filter1, filter2] = theseFilters;
    addFilters({
      0: filter1,
      1: filter2,
    });
    setMainChoiceIsValidated(true);
    setNumberOfSteps(STEP_SECONDARY_CHOICE_1 + 1);
    setCurrentStep(STEP_SECONDARY_CHOICE_1);
  };
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <section className="main-choice-screen">
      <h1 className="step-title">{translate("main_choice_screen_title")}</h1>
      <div className="columns-container">
        <aside className="column is-aside">
          <p className="instructions">
            {translate("main_choice_screen_intro")}
          </p>
          <MetricsCrossingIndicator
            metrics={metricsOrder.map((m, i) => ({
              ...m,
              active: i <= 1,
            }))}
          />
        </aside>
        <main className="column is-main">
          <FilterForm
            metrics={metricsOrder.slice(0, 2)}
            models={models}
            onSubmit={handleSubmit}
            onPreviousStep={handlePreviousStep}
            values={
              filters["0"] && filters["1"]
                ? [filters["0"], filters["1"]]
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
)(MainChoiceContainer);
