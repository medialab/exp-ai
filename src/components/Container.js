import react, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import StepNav from "./StepNav";

import "./Container.scss";

import StepContainer from "./StepContainer";
import Header from "./Header";
import Step1 from "./Step1";
import Step2 from "./Step2";
import SortScreen from "./SortScreen";
import Step3 from "./Step3";
import MainChoiceScreen from "./MainChoiceScreen";

function Container({
  ui: { currentStep, numberOfSteps },
  setCurrentStep,
  getData,
}) {
  useEffect(() => {
    getData();
  }, []);
  const renderStep = (stepIndex = 0) => {
    switch (stepIndex) {
      // header
      case 0:
        return <Header />;
      // intro 1 (dataiku outputs)
      case 1:
        return <Step1 />;
      // intro 2 (eu priniples)
      case 2:
        return <Step2 />;
      // intro 3 (variables presentation)
      case 3:
        return <Step3 />;
      // sort variables
      case 4:
        return <SortScreen />;
      // main choice
      case 5:
        return <MainChoiceScreen />;
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
