import react from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import ContinueButton from "./ContinueButton";
import MetricsCrossingIndicator from "./MetricsCrossingIndicator";

function MainChoiceScreen({
  ui: { currentStep, numberOfSteps, metricsOrderIsValidated },
  data: { metricsOrder },
  setCurrentStep,
  setMetricsOrder,
  setNumberOfSteps,
  setMetricsOrderIsValidated,
}) {
  return (
    <section className="main-choice-screen">
      <h1>{translate("main_choice_screen_title")}</h1>
      <p>{translate("main_choice_screen_intro")}</p>
      <MetricsCrossingIndicator
        metrics={metricsOrder.map((m, i) => ({
          ...m,
          active: i <= 1,
        }))}
      />

      <ContinueButton
        disabled={numberOfSteps <= 6}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainChoiceScreen);
