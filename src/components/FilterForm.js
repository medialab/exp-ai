import react, { useEffect, useState } from "react";
import { min, max } from "d3-array";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useDebounce } from "../helpers/hooks";
import { filterModels } from "../helpers/filters";
import variables from "../contents/variables_list.fr.yml";

const Range = Slider.createSliderWithTooltip(Slider.Range);

function Input({ onChange, validate, value, ...props }) {
  const [localValue, setLocalValue] = useState(value);
  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };
  const handleBlur = () => {
    if (validate(localValue)) {
      onChange(localValue);
    } else {
      setLocalValue(value);
    }
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  return (
    <input
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      value={localValue}
    />
  );
}

function VariableInputs({
  metric,
  values,
  min,
  max,
  onRangeChange,
  filteredVariables,
  onFilteredVariablesChange,
}) {
  const handleMinChange = (val) => {
    onRangeChange([val, values[1]]);
  };
  const handleMaxChange = (val) => {
    onRangeChange([values[0], val]);
  };
  const selected = filteredVariables.reduce(
    (res, id) => ({ ...res, [id]: true }),
    {}
  );
  const SLIDER_MULTIPLIER = 10000;
  return (
    <div className="variable-inputs">
      <h5>
        Choix pour <code>{metric.name}</code>
      </h5>
      {metric.id === "Privacy" ? (
        <div>
          <p>Choisir les variables relevant de la privacy</p>
          <ul>
            {variables.map(({ id, name }) => (
              <li
                onClick={() => {
                  let newVariables;
                  if (selected[id]) {
                    newVariables = filteredVariables.filter(
                      (thatId) => id !== thatId
                    );
                  } else {
                    newVariables = [...filteredVariables, id];
                  }
                  onFilteredVariablesChange(newVariables);
                }}
                key={id}
              >
                <input
                  checked={selected[id] !== undefined}
                  value={id}
                  readOnly
                  type="radio"
                />
                <label>{name}</label>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p>
        Modèles entre{" "}
        <Input
          validate={(val) => !isNaN(val) && val < values[1]}
          onChange={handleMinChange}
          value={"" + values[0]}
        />{" "}
        et{" "}
        <Input
          validate={(val) => !isNaN(val) && val > values[0]}
          value={"" + values[1]}
          onChange={handleMaxChange}
        />{" "}
        (min: {min}, max: {max})
      </p>

      <Range
        allowCross={false}
        tipFormatter={(val) => val / SLIDER_MULTIPLIER}
        onChange={([thatMin, thatMax]) => {
          onRangeChange([
            thatMin / SLIDER_MULTIPLIER,
            thatMax / SLIDER_MULTIPLIER,
          ]);
        }}
        step={metric.type === "integer" ? SLIDER_MULTIPLIER : undefined}
        min={min * SLIDER_MULTIPLIER}
        max={max * SLIDER_MULTIPLIER}
        defaultValue={[min * SLIDER_MULTIPLIER, max * SLIDER_MULTIPLIER]}
        value={[values[0] * SLIDER_MULTIPLIER, values[1] * SLIDER_MULTIPLIER]}
        style={{ width: "50vw" }}
      />
    </div>
  );
}

function FilterForm({ metrics, models, onSubmit, filters = [] }) {
  let [metric1, metric2] = metrics;

  const [absoluteMin1, setAbsoluteMin1] = useState(0);
  const [absoluteMax2, setAbsoluteMax2] = useState(0);
  const [filteredVariables, setFilteredVariables] = useState(
    variables
      .filter(({ relates_to_privacy }) => relates_to_privacy)
      .map(({ id }) => id)
  );

  const [absoluteMin2, setAbsoluteMin2] = useState(0);
  const [absoluteMax1, setAbsoluteMax1] = useState(0);

  const [choosenMin1, setChoosenMin1] = useState(null);
  const [choosenMax2, setChoosenMax2] = useState(null);

  const [choosenMin2, setChoosenMin2] = useState(null);
  const [choosenMax1, setChoosenMax1] = useState(null);

  const [filteredModels, setFilteredModels] = useState(models);

  useDebounce(
    () => {
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
    2000
  );

  useEffect(() => {
    metric1 = metrics[0];
    metric2 = metrics[1];
    let absMin1, absMax1, absMin2, absMax2;
    if (metric1.id === "Privacy") {
      absMin1 = min(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      absMax1 = max(
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
      absMin2 = min(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      absMax2 = max(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
    } else {
      absMin2 = min(models, (d) => +d[metric2.id]);
      absMax2 = max(models, (d) => +d[metric2.id]);
    }

    setAbsoluteMin1(absMin1);
    setAbsoluteMax1(absMax1);
    setAbsoluteMin2(absMin2);
    setAbsoluteMax2(absMax2);

    setChoosenMin1(absMin1);
    setChoosenMax1(absMax1);
    setChoosenMin2(absMin2);
    setChoosenMax2(absMax2);

    setFilteredVariables(
      variables
        .filter(({ relates_to_privacy }) => relates_to_privacy)
        .map(({ id }) => id)
    );
  }, [models, metrics]);

  useEffect(() => {
    if (metric1.id === "Privacy") {
      const absMin1 = min(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      const absMax1 = max(
        models,
        (d) =>
          d.variables.filter((vName) => -filteredVariables.includes(vName))
            .length
      );
      setAbsoluteMin1(absMin1);
      setAbsoluteMax1(absMax1);
    }
    if (metric2.id === "Privacy") {
      const absMin2 = min(
        models,
        (d) =>
          -d.variables.filter((vName) => filteredVariables.includes(vName))
            .length
      );
      const absMax2 = max(
        models,
        (d) =>
          -d.variables.filter((vName) => filteredVariables.includes(vName))
            .length
      );
      setAbsoluteMin2(absMin2);
      setAbsoluteMax2(absMax2);
    }
  }, [filteredVariables]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleValidate = (e) => {
    e.preventDefault();
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
  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <h4>
        Vous sélectionnez dans <code>{metric1.name}</code> et{" "}
        <code>{metric2.name}</code>
      </h4>
      <VariableInputs
        metric={metric1}
        values={[choosenMin1, choosenMax1]}
        min={absoluteMin1}
        max={absoluteMax1}
        filteredVariables={filteredVariables}
        onRangeChange={([thatMin, thatMax]) => {
          setChoosenMin1(thatMin);
          setChoosenMax1(thatMax);
        }}
        onFilteredVariablesChange={(theseVars) => {
          setFilteredVariables(theseVars);
        }}
      />
      <VariableInputs
        metric={metric2}
        values={[choosenMin2, choosenMax2]}
        min={absoluteMin2}
        max={absoluteMax2}
        filteredVariables={filteredVariables}
        onRangeChange={([thatMin, thatMax]) => {
          setChoosenMin2(thatMin);
          setChoosenMax2(thatMax);
        }}
        onFilteredVariablesChange={(theseVars) => {
          setFilteredVariables(theseVars);
        }}
      />

      <p>{filteredModels.length} modèles sélectionnés</p>

      <button onClick={handleValidate} type="submit">
        Valider
      </button>
    </form>
  );
}

export default FilterForm;
