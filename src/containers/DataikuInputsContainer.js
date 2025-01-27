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
  data: { dataikuResults },
  setCurrentStep,
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
    setCurrentStep(nextStep);
  };
  return (
    <section className="single-choice-screen contents-wrapper">
      <div className="contents-container">
        <h1 className="step-title">
          {translate("dataiku_input_screen_title")}
        </h1>
        <p className="instructions">
          {translate("dataiku_input_screen_intro")}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <ul>
            {metricsList.map(({ id, name }) => {
              const handleChange = (e) => {
                setData({
                  ...data,
                  [id]: e.target.value.replace(",", "."),
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
)(DataikuInputsContainer);
