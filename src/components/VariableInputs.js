import react, { useEffect, useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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

export default VariableInputs;
