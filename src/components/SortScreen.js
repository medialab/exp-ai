import react from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import ContinueButton from "./ContinueButton";

function SortScreen({ ui: { currentStep }, setCurrentStep }) {
  return (
    <section className="sort-screen">
      Sort Screen
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

export default connect(mapStateToProps, mapDispatchToProps)(SortScreen);
