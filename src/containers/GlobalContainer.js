import react, { useEffect } from "react"; /* eslint no-unused-vars : 0 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import StepNav from "../components/StepNav";

import "./GlobalContainer.scss";

import StepContainer from "../components/StepContainer";

import HeaderContainer from "./HeaderContainer";
import DataikuIntroContainer from "./DataikuIntroContainer";
import EuLegislationContainer from "./EuLegislationContainer";
import MetricsIntroContainer from "./MetricsIntroContainer";
import MetricsOrderingContainer from "./MetricsOrderingContainer";
import MainChoiceContainer from "./MainChoiceContainer";
import SecondaryChoiceContainer from "./SecondaryChoiceContainer";
import DataikuInputsContainer from "./DataikuInputsContainer";
import ModelChoiceContainer from "./ModelChoiceContainer";
import ConclusionContainer from "./ConclusionContainer";

import {
  STEP_HEADER,
  STEP_DATAIKU_PRACTICE,
  STEP_EU_LEGISLATION,
  STEP_METRICS_EXPLANATION,
  STEP_METRICS_SORTING,
  STEP_MAIN_CHOICE,
  STEP_SECONDARY_CHOICE_1,
  STEP_SECONDARY_CHOICE_2,
  STEP_MODEL_CHOICE,
  STEP_DATAIKU_FEEDBACK,
  STEP_CONCLUSION,
} from "../constants";

function GlobalContainer({
  ui: { currentStep, numberOfSteps },
  setCurrentStep,
  startApp,
  getData,
}) {
  useEffect(() => {
    startApp();
    getData();
  }, [startApp, getData]);
  const renderStep = (stepIndex = 0) => {
    switch (stepIndex) {
      // header
      case STEP_HEADER:
        return <HeaderContainer />;
      // intro 1 (dataiku outputs)
      case STEP_DATAIKU_PRACTICE:
        return <DataikuIntroContainer />;
      // intro 2 (eu priniples)
      case STEP_EU_LEGISLATION:
        return <EuLegislationContainer />;
      // intro 3 (variables presentation)
      case STEP_METRICS_EXPLANATION:
        return <MetricsIntroContainer />;
      // sort variables
      case STEP_METRICS_SORTING:
        return <MetricsOrderingContainer />;
      // main choice
      case STEP_MAIN_CHOICE:
        return <MainChoiceContainer />;
      // second choice
      case STEP_SECONDARY_CHOICE_1:
        return (
          <SecondaryChoiceContainer
            metricsExtent={[2, 3]}
            previousExtents={[[0, 1]]}
          />
        );
      case STEP_SECONDARY_CHOICE_2:
        return (
          <SecondaryChoiceContainer
            nextStep={STEP_MODEL_CHOICE}
            previousExtents={[
              [0, 1],
              [2, 3],
            ]}
            metricsExtent={[3, 4]}
          />
        );
      case STEP_MODEL_CHOICE:
        return <ModelChoiceContainer />;
      case STEP_DATAIKU_FEEDBACK:
        return <DataikuInputsContainer />;
      case STEP_CONCLUSION:
        return <ConclusionContainer />;
      default:
        return <>Step {stepIndex}</>;
    }
  };

  let steps = new Array(numberOfSteps);
  for (let i = 0; i < steps.length; i++) {
    steps[i] = i;
  }
  return (
    <div className="container">
      {steps.map((s, index) => (
        <StepContainer key={index} active={index === currentStep}>
          {renderStep(index)}
        </StepContainer>
      ))}
      <StepNav
        {...{
          currentStep,
          setCurrentStep,
          numberOfSteps,
        }}
      />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GlobalContainer);
