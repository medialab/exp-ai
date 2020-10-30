import react, {
  useEffect,
  useState,
} from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import ContinueButton from "../components/ContinueButton";

import metricsList from "../contents/metrics_list.fr.yml";

import { STEP_CONCLUSION } from "../constants";

function DataikuInputsContainer({
  ui: { numberOfSteps, mainChoiceIsValidated },
  data: { dataikuResults },
  setCurrentStep,
  setNumberOfSteps,
  setDataikuResults,
  nextStep = STEP_CONCLUSION,
}) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (dataikuResults) {
      setData(dataikuResults);
    }
  }, [dataikuResults]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataikuResults(data);
    setNumberOfSteps(nextStep + 1);
    setCurrentStep(nextStep);
  };
  return (
    <section className="single-choice-screen">
      <h1>{translate("dataiku_input_screen_title")}</h1>
      <p>{translate("dataiku_input_screen_intro")}</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {metricsList.map(({ id, name }) => {
            const handleChange = (e) => {
              console.log(id, e.target.value);
              setData({
                ...data,
                [id]: e.target.value,
              });
            };
            return (
              <li key={id}>
                <label>{name}</label>
                <input
                  placeholder={`entrez vous résultats pour la métrique ${name}`}
                  value={data[id] || ""}
                  onChange={handleChange}
                />
              </li>
            );
          })}
        </ul>
        <button type="submit" onClick={handleSubmit}>
          Valider et passer aux conclusions
        </button>
      </form>
      <ContinueButton
        disabled={!mainChoiceIsValidated || numberOfSteps <= nextStep}
        onClick={() => setCurrentStep(nextStep)}
      />
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
)(DataikuInputsContainer);
