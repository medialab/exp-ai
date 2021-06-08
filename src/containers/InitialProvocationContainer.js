/* eslint import/no-webpack-loader-syntax: off */
import react from "react"; /* eslint no-unused-vars : 0 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";

import provocations from "../contents/provocations.yml";

import * as uiDuck from "../state/duckUi";

import ContinueButton from "../components/ContinueButton";
// import { STEP_DATAIKU_PRACTICE } from "../constants";
import { STEP_METRICS_SORTING } from "../constants";

function HeaderContainer({ setCurrentStep, ui: { iterationNumber } }) {
  const handleNext = () => setCurrentStep(STEP_METRICS_SORTING);
  return (
    <header className="header contents-wrapper">
      <div className="contents-container">
        {provocations
          .filter((provocation) => provocation.iteration === iterationNumber)
          .map(({ id, src }) => (
            <div className="provocation-image-container">
              <h1>{translate("provocation_intro")}</h1>
              <img
                key={id}
                src={`${process.env.PUBLIC_URL}/images/${src}`}
                alt={id}
              />
            </div>
          ))}
      </div>
      <ContinueButton onClick={handleNext} />
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
