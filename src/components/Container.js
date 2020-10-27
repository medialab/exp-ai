import react from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as uiDuck from "../state/duckUi";
import StepNav from "./StepNav";

import "./Container.scss";
import StepContainer from "./StepContainer";

function Container({ ui: { currentStep, numberOfSteps }, setCurrentStep }) {
  const renderStep = (stepIndex = 0) => {
    switch (stepIndex) {
      case 0:
        return (
          <StepContainer
            key={stepIndex}
            active={stepIndex === currentStep}
            style={{ background: "lightgreen" }}
          >
            Step {stepIndex}
          </StepContainer>
        );
      case 1:
        return (
          <StepContainer
            key={stepIndex}
            active={stepIndex === currentStep}
            style={{ background: "green" }}
          >
            Step {stepIndex}
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer
            key={stepIndex}
            active={stepIndex === currentStep}
            style={{ background: "blue" }}
          >
            Step {stepIndex}
          </StepContainer>
        );
      default:
        return (
          <StepContainer
            key={stepIndex}
            active={stepIndex === currentStep}
            style={{ background: "purple" }}
          >
            Step {stepIndex}
          </StepContainer>
        );
    }
  };

  let steps = new Array(numberOfSteps);
  for (let i = 0; i < steps.length; i++) {
    steps[i] = i;
  }
  return (
    <div className="container">
      {steps.map((s, index) => renderStep(index))}
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

const mapStateToProps = (state) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Container);
