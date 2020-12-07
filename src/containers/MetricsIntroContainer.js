/* eslint import/no-webpack-loader-syntax: off */
import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Md from "react-markdown";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import ContinueButton from "../components/ContinueButton";

import intro from "!!raw-loader!../contents/metrics_explanation.md";
import { STEP_METRICS_SORTING } from "../constants";

function MetricsIntroContainer({ setCurrentStep, currentStep }) {
  return (
    <section className="step-3 contents-wrapper">
      <div className="contents-container">
        <h1 className="step-title">{translate("step_3_title")}</h1>
        <div className="contents">
          <Md source={intro} />
        </div>
      </div>

      <ContinueButton
        currentStep={currentStep}
        onSetCurrentStep={setCurrentStep}
        backwardEnabled
      />
    </section>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state,
  ...uiDuck.selector(state.ui),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...uiDuck,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricsIntroContainer);
