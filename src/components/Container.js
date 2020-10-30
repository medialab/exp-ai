import react, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import StepNav from "./StepNav";

import "./Container.scss";

import StepContainer from "./StepContainer";
import Header from "./Header";
import StepDataikuIntro from "./StepDataikuIntro";
import StepEuLegislation from "./StepEuLegislation";
import StepMetricsIntro from "./StepMetricsIntro";
import SortScreen from "./SortScreen";
import MainChoiceScreen from "./MainChoiceScreen";
import SecondChoiceScreen from "./SecondChoiceScreen";
import DataikuInputs from "./DataikuInputs";
import SingleChoiceScreen from "./SingleChoiceScreen";
import StepConclusion from "./StepConclusion";

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

function Container({
  ui: { currentStep, numberOfSteps },
  setCurrentStep,
  startApp,
  getData,
}) {
  useEffect(() => {
    startApp();
    getData();
  }, []);
  const renderStep = (stepIndex = 0) => {
    switch (stepIndex) {
      // header
      case STEP_HEADER:
        return <Header />;
      // intro 1 (dataiku outputs)
      case STEP_DATAIKU_PRACTICE:
        return <StepDataikuIntro />;
      // intro 2 (eu priniples)
      case STEP_EU_LEGISLATION:
        return <StepEuLegislation />;
      // intro 3 (variables presentation)
      case STEP_METRICS_EXPLANATION:
        return <StepMetricsIntro />;
      // sort variables
      case STEP_METRICS_SORTING:
        return <SortScreen />;
      // main choice
      case STEP_MAIN_CHOICE:
        return <MainChoiceScreen />;
      // second choice
      case STEP_SECONDARY_CHOICE_1:
        return (
          <SecondChoiceScreen
            metricsExtent={[2, 3]}
            previousExtents={[[0, 1]]}
          />
        );
      case STEP_SECONDARY_CHOICE_2:
        return (
          <SecondChoiceScreen
            nextStep={STEP_MODEL_CHOICE}
            previousExtents={[
              [0, 1],
              [2, 3],
            ]}
            metricsExtent={[3, 4]}
          />
        );
      case STEP_MODEL_CHOICE:
        return <SingleChoiceScreen />;
      case STEP_DATAIKU_FEEDBACK:
        return <DataikuInputs />;
      case STEP_CONCLUSION:
        return <StepConclusion />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Container);
