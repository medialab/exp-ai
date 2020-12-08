import react, {
  // useCallback,
  useEffect,
  useState,
} from "react"; /* eslint no-unused-vars : 0 */
import { min, max } from "d3-array";
import Tooltip from "react-tooltip";
import "./FilterForm.scss";

import BrushableScatterPlot from "./BrushableScatterPlot";
import VariableInputs from "./VariableInputs";
import ContinueButton from "./ContinueButton";

import { useDebounce } from "../helpers/hooks";
import { filterModels } from "../helpers/filters";
import variables from "../contents/variables_list.fr.yml";
import { DECIMALS } from "../constants";
import InfoTip from "./InfoTip";

function FilterForm({
  metrics,
  models,
  onSubmit,
  onPreviousStep,
  filters = [],
  privacyVariables,
  values,
}) {
  let [metric1, metric2] = metrics;

  const filteredVariables = variables
    .filter(({ id }) => privacyVariables[id])
    .map(({ id }) => id);

  const [absoluteMin1, setAbsoluteMin1] = useState(0);
  const [absoluteMax2, setAbsoluteMax2] = useState(0);

  const [absoluteMin2, setAbsoluteMin2] = useState(0);
  const [absoluteMax1, setAbsoluteMax1] = useState(0);
  const [choosenMin1, setChoosenMin1] = useState(null);
  const [choosenMax2, setChoosenMax2] = useState(null);

  const [choosenMin2, setChoosenMin2] = useState(null);
  const [choosenMax1, setChoosenMax1] = useState(null);

  const [filteredModels, setFilteredModels] = useState(models);

  useEffect(() => {
    if (!models.length) return null;
    if (values && values.length > 1) {
      setChoosenMin1(values[0].range[0]);
      setChoosenMax1(values[0].range[1]);
      setChoosenMin2(values[1].range[0]);
      setChoosenMax2(values[1].range[1]);
    } else {
      setChoosenMin1(absoluteMin1);
      setChoosenMax1(absoluteMax1);
      setChoosenMin2(absoluteMin2);
      setChoosenMax2(absoluteMax2);
    }
  }, [values]); /* eslint react-hooks/exhaustive-deps : 0 */

  useDebounce(
    () => {
      if (!models.length) return null;
      const theseFilters = [
        ...filters,
        {
          variable: metric1.id,
          type: "range",
          range: [choosenMin1, choosenMax1],
          variables: metric1.id === "Privacy" ? filteredVariables : undefined,
        },
        {
          variable: metric2.id,
          type: "range",
          range: [choosenMin2, choosenMax2],
          variables: metric2.id === "Privacy" ? filteredVariables : undefined,
        },
      ];
      setFilteredModels(filterModels(models, theseFilters));
    },
    [choosenMin1, choosenMax1, choosenMin2, choosenMax2],
    1000
  );

  useEffect(() => {
    if (!models.length) return null;
    metric1 = metrics[0];
    metric2 = metrics[1];
    let absMin1, absMax1, absMin2, absMax2;
    if (metric1.id === "Privacy") {
      absMin1 = -max(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      absMax1 = -min(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
    } else {
      absMin1 = min(models, (d) => +d[metric1.id]);
      absMax1 = max(models, (d) => +d[metric1.id]);
    }
    if (metric2.id === "Privacy") {
      absMin2 = -max(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      absMax2 = -min(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
    } else {
      absMin2 = min(models, (d) => +d[metric2.id]);
      absMax2 = max(models, (d) => +d[metric2.id]);
    }
    setAbsoluteMin1(+absMin1.toFixed(DECIMALS));
    setAbsoluteMax1(+absMax1.toFixed(DECIMALS));
    setAbsoluteMin2(+absMin2.toFixed(DECIMALS));
    setAbsoluteMax2(+absMax2.toFixed(DECIMALS));

    if (!values) {
      setChoosenMin1(+absMin1.toFixed(DECIMALS));
      setChoosenMax1(+absMax1.toFixed(DECIMALS));
      setChoosenMin2(+absMin2.toFixed(DECIMALS));
      setChoosenMax2(+absMax2.toFixed(DECIMALS));
    }
  }, [models, metrics]);

  useEffect(() => {
    if (!models.length) return null;
    if (metric1.id === "Privacy") {
      const absMin1 = -max(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      const absMax1 = -min(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      setAbsoluteMin1(absMin1);
      setAbsoluteMax1(absMax1);
    }
    if (metric2.id === "Privacy") {
      const absMin2 = -max(
        models,
        (d) =>
          d.variables.filter((vName) => filteredVariables.includes(vName))
            .length
      );
      const absMax2 = -min(
        models,
        (d) =>
          d.variables.filter((vName) => filteredVariables.includes(vName))
            .length
      );
      setAbsoluteMin2(absMin2);
      setAbsoluteMax2(absMax2);
    }
  }, [filteredVariables]);

  if (!models.length) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleValidate = (e) => {
    onSubmit([
      {
        variable: metric1.id,
        type: "range",
        range: [choosenMin1, choosenMax1],
        variables: metric1.id === "Privacy" ? filteredVariables : undefined,
      },
      {
        variable: metric2.id,
        type: "range",
        range: [choosenMin2, choosenMax2],
        variables: metric2.id === "Privacy" ? filteredVariables : undefined,
      },
    ]);
  };
  const handleBrushChange = ({
    x: [thatXMin, thatXMax],
    y: [thatYMin, thatYMax],
  }) => {
    setChoosenMin1(+thatXMin.toFixed(DECIMALS));
    setChoosenMax1(+thatXMax.toFixed(DECIMALS));
    setChoosenMin2(+thatYMin.toFixed(DECIMALS));
    setChoosenMax2(+thatYMax.toFixed(DECIMALS));
  };
  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="columns-container">
        <div className="column is-main">
          <BrushableScatterPlot
            data={models}
            xVariable={metric1.id}
            yVariable={metric2.id}
            filteredVariables={filteredVariables}
            brush={{
              x: [choosenMin1, choosenMax1],
              y: [choosenMin2, choosenMax2],
            }}
            onBrushChange={handleBrushChange}
            width={900}
            height={600}
          />
          <h4>
            Vous filtrez dans{" "}
            <code>
              {metric1.name} <InfoTip tip={metric1.short_description} />
            </code>{" "}
            sur les x et{" "}
            <code>
              {metric2.name} <InfoTip tip={metric2.short_description} />
            </code>{" "}
            sur les y
          </h4>
          <p>
            <span className="count-indicator">{filteredModels.length}</span>{" "}
            modèles sélectionnés
          </p>
        </div>
        <div className="column is-aside">
          <VariableInputs
            metric={metric1}
            values={[choosenMin1, choosenMax1]}
            min={absoluteMin1}
            max={absoluteMax1}
            axis={"abscisses"}
            filteredVariables={filteredVariables}
            onRangeChange={([thatMin, thatMax]) => {
              setChoosenMin1(thatMin);
              setChoosenMax1(thatMax);
            }}
          />
          <VariableInputs
            metric={metric2}
            values={[choosenMin2, choosenMax2]}
            min={absoluteMin2}
            max={absoluteMax2}
            filteredVariables={filteredVariables}
            axis={"ordonnées"}
            onRangeChange={([thatMin, thatMax]) => {
              setChoosenMin2(thatMin);
              setChoosenMax2(thatMax);
            }}
          />
        </div>
      </div>
      <ContinueButton
        disabled={!filteredModels.length}
        onSubmit={handleValidate}
        submitMessage={"validate"}
        onPreviousStep={onPreviousStep}
        backwardEnabled
        type={"submit"}
      />

      <Tooltip id="tip" />
    </form>
  );
}

export default FilterForm;
