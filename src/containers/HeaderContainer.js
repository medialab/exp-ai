/* eslint import/no-webpack-loader-syntax: off */
import react from "react"; /* eslint no-unused-vars : 0 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Md from "react-markdown";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";

import intro from "!!raw-loader!../contents/global_intro.md";

import ContinueButton from "../components/ContinueButton";
import { STEP_DATAIKU_PRACTICE } from "../constants";

function HeaderContainer({ setCurrentStep }) {
  return (
    <header className="header contents-wrapper">
      <div className="contents-container">
        <h1 className="header-title">{translate("site_title")}</h1>
        <div className="emphasis">
          <Md source={intro} />
        </div>
      </div>
      <ContinueButton onClick={() => setCurrentStep(STEP_DATAIKU_PRACTICE)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
