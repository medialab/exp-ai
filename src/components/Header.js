/* eslint import/no-webpack-loader-syntax: off */
import react from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Md from "react-markdown";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";

import intro from "!!raw-loader!../contents/global_intro.md";

import ContinueButton from "./ContinueButton";

function Header({ ui: { currentStep }, setCurrentStep }) {
  return (
    <header className="header">
      <h1>{translate("site_title")}</h1>
      <Md source={intro} />
      <ContinueButton onClick={() => setCurrentStep(currentStep + 1)} />
    </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
