/* eslint import/no-webpack-loader-syntax: off */
import react from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Md from "react-markdown";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import ContinueButton from "./ContinueButton";

import intro from "!!raw-loader!../contents/principles_eu.md";

function Step2({ ui: { currentStep }, setCurrentStep }) {
  return (
    <section className="step-2">
      <h1>{translate("step_2_title")}</h1>
      <Md source={intro} />

      <ContinueButton onClick={() => setCurrentStep(currentStep + 1)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
