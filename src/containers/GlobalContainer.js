import react, { useEffect } from "react"; /* eslint no-unused-vars : 0 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Tooltip from "react-tooltip";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import StepNav from "../components/StepNav";

import "./GlobalContainer.scss";

import StepContainer from "../components/StepContainer";

import HeaderContainer from "./HeaderContainer";
import InitialProvocationContainer from "./InitialProvocationContainer";
// import DataikuIntroContainer from "./DataikuIntroContainer";
// import EuLegislationContainer from "./EuLegislationContainer";
// import MetricsIntroContainer from "./MetricsIntroContainer";
import MetricsOrderingContainer from "./MetricsOrderingContainer";
import MainChoiceContainer from "./MainChoiceContainer";
import SecondaryChoiceContainer from "./SecondaryChoiceContainer";
import ModelChoiceContainer from "./ModelChoiceContainer";
import ConclusionContainer from "./ConclusionContainer";

import {
  STEP_HEADER,
  STEP_INITIAL_PROVOCATION,
  // STEP_DATAIKU_PRACTICE,
  // // STEP_EU_LEGISLATION,
  // STEP_METRICS_EXPLANATION_0,
  // STEP_METRICS_EXPLANATION_1,
  // STEP_METRICS_EXPLANATION_2,
  // STEP_METRICS_EXPLANATION_3,
  // STEP_METRICS_EXPLANATION_4,
  // STEP_METRICS_EXPLANATION_5,
  STEP_METRICS_SORTING,
  STEP_MAIN_CHOICE,
  STEP_SECONDARY_CHOICE_1,
  STEP_SECONDARY_CHOICE_2,
  STEP_SECONDARY_CHOICE_3,
  STEP_MODEL_CHOICE,
  // STEP_DATAIKU_FEEDBACK,
  STEP_CONCLUSION,
} from "../constants";
import translate from "../helpers/translate";

function GlobalContainer({
  ui: { currentStep, metricsOrderIsValidated, iterationNumber },
  data: { filters, choosenModel },
  setCurrentStep,
  startApp,
  getData,
}) {
  useEffect(() => {
    startApp();
    getData();
  }, [startApp, getData]);

  const steps = {
    [STEP_HEADER]: {
      renderStep: () => <HeaderContainer />,
      title: translate("home"),
    },
    [STEP_INITIAL_PROVOCATION]: {
      renderStep: () => <InitialProvocationContainer />,
      title: translate("provocation"),
    },
    // [STEP_DATAIKU_PRACTICE]: {
    //   renderStep: () => <DataikuIntroContainer />,
    //   title: translate("intro-dataiku"),
    // },
    // [STEP_EU_LEGISLATION]: {
    //   renderStep: () => <EuLegislationContainer />,
    //   title: translate("intro-eu"),
    // },
    [STEP_METRICS_SORTING]: {
      renderStep: () => <MetricsOrderingContainer />,
      title: translate("metrics-sorting"),
    },
    [STEP_MAIN_CHOICE]: {
      renderStep: () => <MainChoiceContainer />,
      title: translate("main-choice"),
      disabled: !metricsOrderIsValidated,
    },
    [STEP_SECONDARY_CHOICE_1]: {
      renderStep: () =>
        Object.keys(filters).length < 2 ? null : (
          <SecondaryChoiceContainer
            nextStep={
              iterationNumber === 0
                ? STEP_MODEL_CHOICE
                : STEP_SECONDARY_CHOICE_2
            }
            metricsExtent={[1, 2]}
            previousExtents={[[0, 1]]}
          />
        ),
      title: translate("secondary-choice") + " 1",
      disabled: !metricsOrderIsValidated || Object.keys(filters).length < 2,
    },
    [STEP_SECONDARY_CHOICE_2]: {
      renderStep: () => (
        /* Object.keys(filters).length < 4 ? null :*/
        <SecondaryChoiceContainer
          nextStep={STEP_MODEL_CHOICE}
          previousExtents={[
            [0, 1],
            [1, 2],
          ]}
          metricsExtent={[2, 3]}
        />
      ),
      title: translate("secondary-choice") + " 2",
      disabled: !metricsOrderIsValidated /*|| Object.keys(filters).length < 4*/,
    },
    // [STEP_SECONDARY_CHOICE_3]: {
    //   renderStep: () => (
    //     /* Object.keys(filters).length < 4 ? null :*/ <SecondaryChoiceContainer
    //       nextStep={STEP_MODEL_CHOICE}
    //       previousExtents={[
    //         [0, 1],
    //         [1, 2],
    //         [2, 3],
    //       ]}
    //       metricsExtent={[3, 4]}
    //     />
    //   ),
    //   title: translate("secondary-choice") + " 3",
    //   disabled: !metricsOrderIsValidated /*|| Object.keys(filters).length < 4*/,
    // },
    [STEP_MODEL_CHOICE]: {
      renderStep: () =>
        Object.keys(filters).length < 2 ? null : (
          <ModelChoiceContainer
            step={STEP_MODEL_CHOICE}
            previousStep={
              iterationNumber === 0
                ? STEP_SECONDARY_CHOICE_1
                : STEP_SECONDARY_CHOICE_2
            }
          />
        ),
      title: translate("model-choice"),
      disabled: !metricsOrderIsValidated /*|| Object.keys(filters).length < 5*/,
    },
    [STEP_CONCLUSION]: {
      renderStep: () => <ConclusionContainer />,
      title: translate("conclusion"),
      disabled: !metricsOrderIsValidated || !choosenModel,
    },
  };
  // console.log({ currentStep, steps });

  // const metricsInfo = [
  //   // STEP_METRICS_EXPLANATION_0,
  //   // STEP_METRICS_EXPLANATION_1,
  //   // STEP_METRICS_EXPLANATION_2,
  //   // STEP_METRICS_EXPLANATION_3,
  //   // STEP_METRICS_EXPLANATION_4,
  //   // STEP_METRICS_EXPLANATION_5,
  // ];
  // metricsInfo.forEach((index) => {
  //   steps[index] = {
  //     renderStep: () => <MetricsIntroContainer />,
  //     title: `${translate("intro-metrics")} (${index + 1})`,
  //   };
  // });
  return (
    <div className="container">
      {Object.entries(steps).map(([index, s]) => {
        const { renderStep } = s;
        return (
          <StepContainer key={index} active={+index === currentStep}>
            {renderStep()}
          </StepContainer>
        );
      })}
      <StepNav
        {...{
          currentStep,
          setCurrentStep,
          steps,
        }}
      />
      <Tooltip id="tooltip" />
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
