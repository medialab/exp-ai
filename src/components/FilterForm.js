import react, { useEffect, useState } from "react";
import { min, max } from "d3-array";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useDebounce } from "../helpers/hooks";
import { filterModels } from "../helpers/filters";

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

function VariableInputs({ metric, values, min, max, onChange }) {
  const handleMinChange = (val) => {
    onChange([val, values[1]]);
  };
  const handleMaxChange = (val) => {
    onChange([values[0], val]);
  };
  const SLIDER_MULTIPLIER = 10000;
  return (
    <div className="variable-inputs">
      <h5>
        Choix pour <code>{metric.name}</code>
      </h5>
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
          onChange([thatMin / SLIDER_MULTIPLIER, thatMax / SLIDER_MULTIPLIER]);
        }}
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
        },
        {
          variable: metric2.id,
          type: "range",
          range: [choosenMin2, choosenMax2],
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
    console.log(metric2);
    const absMin1 = min(models, (d) => d[metric1.id]);
    const absMax1 = max(models, (d) => d[metric1.id]);

    const absMin2 = min(models, (d) => d[metric2.id]);
    const absMax2 = max(models, (d) => d[metric2.id]);
    setAbsoluteMin1(absMin1);
    setAbsoluteMax1(absMax1);
    setAbsoluteMin2(absMin2);
    setAbsoluteMax2(absMax2);

    setChoosenMin1(absMin1);
    setChoosenMax1(absMax1);
    setChoosenMin2(absMin2);
    setChoosenMax2(absMax2);
  }, [models, metrics]);

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
      },
      {
        variable: metric2.id,
        type: "range",
        range: [choosenMin2, choosenMax2],
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
        onChange={([thatMin, thatMax]) => {
          setChoosenMin1(thatMin);
          setChoosenMax1(thatMax);
        }}
      />
      <VariableInputs
        metric={metric2}
        values={[choosenMin2, choosenMax2]}
        min={absoluteMin2}
        max={absoluteMax2}
        onChange={([thatMin, thatMax]) => {
          setChoosenMin2(thatMin);
          setChoosenMax2(thatMax);
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
