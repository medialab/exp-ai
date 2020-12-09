import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";
import { filterModels } from "../helpers/filters";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import MetricsCrossingIndicator from "../components/MetricsCrossingIndicator";

import FilterForm from "../components/FilterForm";

import {
  STEP_MAIN_CHOICE,
  STEP_SECONDARY_CHOICE_1,
  STEP_SECONDARY_CHOICE_2,
} from "../constants";
import MiniGraph from "../components/MiniGraph";

function SecondChoiceContainer({
  data: { metricsOrder, models, filters, privacyVariables = {} },
  setCurrentStep,
  setMainChoiceIsValidated,
  addFilters,
  metricsExtent: [fromMetric, toMetric] = [2, 3],
  previousExtents = [],
  nextStep = STEP_SECONDARY_CHOICE_2,
  currentStep,
}) {
  const handleSubmit = (theseFilters) => {
    const [filter1, filter2] = theseFilters;
    addFilters({
      [fromMetric + ""]: filter1,
      [toMetric + ""]: filter2,
    });
    setMainChoiceIsValidated(true);
    setCurrentStep(nextStep);
  };
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!Object.keys(filters).length) return null;

  return (
    <section className="second-choice-screen">
      <h1 className="step-title">{translate("second_choice_screen_title")}</h1>
      <div className="columns-container">
        <aside className="column is-aside">
          <p className="instructions">
            {translate("second_choice_screen_intro")}
          </p>
          <MetricsCrossingIndicator
            metrics={metricsOrder.map((m, i) => ({
              ...m,
              active: i >= fromMetric && i <= toMetric,
            }))}
          />
          <h4>Vos arbitrages précédents :</h4>
          {/* mini scatterplots for previous steps */}
          {previousExtents.map(([from, to], index) => {
            let theseVariables = [filters[from + ""], filters[to + ""]].find(
              (f) => f && f.variables
            );
            theseVariables = theseVariables
              ? theseVariables.variables
              : undefined;
            const handleNav = () => {
              let target;
              switch (index) {
                case 0:
                  target = STEP_MAIN_CHOICE;
                  break;
                case 1:
                  target = STEP_SECONDARY_CHOICE_1;
                  break;
                case 2:
                default:
                  target = STEP_SECONDARY_CHOICE_2;
                  break;
              }
              setCurrentStep(target);
            };
            return (
              <MiniGraph
                key={index}
                {...{
                  index,
                  filters,
                  models,
                  fromName: metricsOrder.find(
                    ({ id }) => id === filters[from + ""].variable
                  ).name,
                  toName: metricsOrder.find(
                    ({ id }) => id === filters[to + ""].variable
                  ).name,
                  onNav: handleNav,
                  from,
                  to,
                  variables: theseVariables,
                  addFilters,
                  filterModels,
                }}
              />
            );
          })}
        </aside>
        <main className="column is-main">
          <FilterForm
            metrics={metricsOrder.slice(fromMetric, toMetric + 1)}
            models={filterModels(
              models,
              Object.entries(filters)
                .filter(([key]) => +key < fromMetric)
                .map(([_key, filter]) => filter)
            )}
            onSubmit={handleSubmit}
            onPreviousStep={handlePreviousStep}
            privacyVariables={privacyVariables}
            values={
              filters[fromMetric + ""] && filters[toMetric + ""]
                ? [filters[fromMetric + ""], filters[toMetric + ""]]
                : undefined
            }
          />
        </main>
      </div>
    </section>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondChoiceContainer);
