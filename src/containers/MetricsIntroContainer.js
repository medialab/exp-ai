/* eslint import/no-webpack-loader-syntax: off */
import react, { useEffect } from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Md from "react-markdown";
import cx from "classnames";

import translate from "../helpers/translate";
import { metricsColorMap } from "../helpers/misc";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import ContinueButton from "../components/ContinueButton";
import DebouncedInput from "../components/DebouncedInput";

import variables from "../contents/variables_list.fr.yml";

import intro from "!!raw-loader!../contents/metrics_explanation_intro.md";
import errorsDistribution from "!!raw-loader!../contents/metrics_explanation_errors_distribution.md";
import interpretability from "!!raw-loader!../contents/metrics_explanation_interpretability.md";
import performance from "!!raw-loader!../contents/metrics_explanation_performance.md";
import disparateImpact from "!!raw-loader!../contents/metrics_explanation_disparate_impact.md";
import privacy from "!!raw-loader!../contents/metrics_explanation_privacy.md";
import {
  STEP_METRICS_EXPLANATION_0,
  STEP_METRICS_EXPLANATION_1,
  STEP_METRICS_EXPLANATION_2,
  STEP_METRICS_EXPLANATION_3,
  STEP_METRICS_EXPLANATION_4,
  STEP_METRICS_EXPLANATION_5,
  STEP_METRICS_SORTING,
} from "../constants";

function MetricsIntroContainer({
  setCurrentStep,
  currentStep,
  data: { dataikuResults = {}, privacyVariables = {} },
  setDataikuResults,
  setPrivacyVariables,
}) {
  const viewsModel = {
    [STEP_METRICS_EXPLANATION_0]: {
      content: intro,
      title: translate("step_3_title"),
    },
    [STEP_METRICS_EXPLANATION_1]: {
      content: performance,
      title: translate("performance"),
      inputType: "input",
      relatedMetricsId: "performance",
      color: metricsColorMap["performance"],
      id: "performance",
    },
    [STEP_METRICS_EXPLANATION_2]: {
      content: disparateImpact,
      title: translate("disparate_impact"),
      inputType: "input",
      relatedMetricsId: "fairness_disparate_impact",
      color: metricsColorMap["fairness_disparate_impact"],
      id: "disparate_impact",
    },
    [STEP_METRICS_EXPLANATION_3]: {
      content: errorsDistribution,
      title: translate("errors_distribution"),
      inputType: "input",
      relatedMetricsId: "fairness_accuracy",
      color: metricsColorMap["fairness_accuracy"],
      id: "errors_distribution",
    },
    [STEP_METRICS_EXPLANATION_4]: {
      content: privacy,
      title: translate("privacy"),
      inputType: "privacy",
      relatedMetricsId: "privacy",
      color: metricsColorMap["privacy"],
      id: "privacy",
    },
    [STEP_METRICS_EXPLANATION_5]: {
      content: interpretability,
      title: translate("interpretability"),
      inputType: "input",
      relatedMetricsId: "interpretability",
      color: metricsColorMap["interpretability"],
      id: "interpretability",
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleDataikuInputChange = (e) => {
    if (viewsModel[currentStep]) {
      const value = e.target.value;
      setDataikuResults({
        ...dataikuResults,
        [viewsModel[currentStep].relatedMetricsId]: value,
      });
    }
  };
  return viewsModel[currentStep] ? (
    <section className="step-3 contents-wrapper">
      <div className="contents-container">
        <h1 className="step-title">
          {viewsModel[currentStep].title}
          {viewsModel[currentStep].color && (
            <span
              style={{
                background: viewsModel[currentStep].color,
                display: "inline-block",
                marginLeft: "1rem",
                height: "1em",
                width: "1em",
                borderRadius: "50%",
                position: "relative",
                top: ".2em",
              }}
            />
          )}
        </h1>
        <div className="contents">
          <Md source={viewsModel[currentStep].content} />
          {viewsModel[currentStep].inputType ? (
            <>
              {viewsModel[currentStep].inputType === "privacy" ? (
                <>
                  <h2>{translate("privacy_prompt")}</h2>
                  <ul className={cx("privacy-list")}>
                    {variables.map(({ id, name }) => (
                      <li
                        onClick={() => {
                          setPrivacyVariables({
                            ...privacyVariables,
                            [id]: privacyVariables[id] ? false : true,
                          });
                        }}
                        key={id}
                      >
                        <input
                          checked={privacyVariables[id] === true}
                          value={id}
                          readOnly
                          type="radio"
                        />
                        <span className="checkmark" />
                        <label>{name}</label>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <form className="form results-form" onSubmit={handleSubmit}>
                <h2>
                  {translate(
                    "dataiku_results_label_for_" + viewsModel[currentStep].id
                  )}
                </h2>
                <DebouncedInput
                  placeholder={`entrez vous résultats pour la métrique ${viewsModel[currentStep].title}`}
                  value={
                    dataikuResults[viewsModel[currentStep].relatedMetricsId] ||
                    ""
                  }
                  onChange={handleDataikuInputChange}
                />
                <ContinueButton
                  currentStep={currentStep}
                  onSetCurrentStep={setCurrentStep}
                  type={"submit"}
                  backwardEnabled
                />
              </form>
            </>
          ) : (
            <ContinueButton
              currentStep={currentStep}
              onSetCurrentStep={setCurrentStep}
              backwardEnabled
            />
          )}
        </div>
      </div>
    </section>
  ) : null;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricsIntroContainer);
