/* eslint import/no-webpack-loader-syntax: off */
import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Md from "react-markdown";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import ContinueButton from "../components/ContinueButton";
import schema from "../assets/schema_trustworthy_ai.png";

import intro from "!!raw-loader!../contents/principles_eu.md";
import { STEP_METRICS_EXPLANATION } from "../constants";

function EuLegislationContainer({ setCurrentStep, currentStep }) {
  return (
    <section className="step-2 contents-wrapper">
      <div className="contents-container">
        <h1 className="step-title">{translate("step_2_title")}</h1>
        <div className="columns-container">
          <div className="column">
            <div className="contents">
              <Md source={intro} />
            </div>
          </div>
          <div className="column">
            <img
              src={schema}
              alt="schema en provenance du rapport européen trustworthy ai"
            />
          </div>
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
)(EuLegislationContainer);
