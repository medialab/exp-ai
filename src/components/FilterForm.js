import react, { useEffect, useState } from "react";
import { min, max } from "d3-array";
import "./FilterForm.scss";

import BrushableScatterPlot from "./BrushableScatterPlot";
import VariableInputs from "./VariableInputs";

import { useDebounce } from "../helpers/hooks";
import { filterModels } from "../helpers/filters";
import variables from "../contents/variables_list.fr.yml";
import { DECIMALS } from "../constants";

function FilterForm({ metrics, models, onSubmit, filters = [], values }) {
  let [metric1, metric2] = metrics;

  const defaultFilteredVariables = variables
    .filter(({ relates_to_privacy }) => relates_to_privacy)
    .map(({ id }) => id);

  const [absoluteMin1, setAbsoluteMin1] = useState(0);
  const [absoluteMax2, setAbsoluteMax2] = useState(0);
  const [filteredVariables, setFilteredVariables] = useState(
    defaultFilteredVariables
  );

  const [absoluteMin2, setAbsoluteMin2] = useState(0);
  const [absoluteMax1, setAbsoluteMax1] = useState(0);
  const [choosenMin1, setChoosenMin1] = useState(null);
  const [choosenMax2, setChoosenMax2] = useState(null);

  const [choosenMin2, setChoosenMin2] = useState(null);
  const [choosenMax1, setChoosenMax1] = useState(null);

  const [filteredModels, setFilteredModels] = useState(models);

  useEffect(() => {
    if (values && values.length > 1) {
      setChoosenMin1(values[0].range[0]);
      setChoosenMax1(values[0].range[1]);
      setChoosenMin2(values[1].range[0]);
      setChoosenMax2(values[1].range[1]);
      const hasVariables = values.find((v) => v.variables);
      if (hasVariables) {
        setFilteredVariables(hasVariables.variables);
      }
    } else {
      setChoosenMin1(absoluteMin1);
      setChoosenMax1(absoluteMax1);
      setChoosenMin2(absoluteMin2);
      setChoosenMax2(absoluteMax2);
      setFilteredVariables(defaultFilteredVariables);
    }
  }, [values]);

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
    1000
  );

  useEffect(() => {
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

    setAbsoluteMin1(absMin1.toFixed(DECIMALS));
    setAbsoluteMax1(absMax1.toFixed(DECIMALS));
    setAbsoluteMin2(absMin2.toFixed(DECIMALS));
    setAbsoluteMax2(absMax2.toFixed(DECIMALS));

    if (!values) {
      setChoosenMin1(absMin1.toFixed(DECIMALS));
      setChoosenMax1(absMax1.toFixed(DECIMALS));
      setChoosenMin2(absMin2.toFixed(DECIMALS));
      setChoosenMax2(absMax2.toFixed(DECIMALS));
    }

    setFilteredVariables(
      variables
        .filter(({ relates_to_privacy }) => relates_to_privacy)
        .map(({ id }) => id)
    );
  }, [models, metrics]);

  useEffect(() => {
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
  const handleBrushChange = ({
    x: [thatXMin, thatXMax],
    y: [thatYMin, thatYMax],
  }) => {
    setChoosenMin1(thatXMin);
    setChoosenMax1(thatXMax);
    setChoosenMin2(thatYMin);
    setChoosenMax2(thatYMax);
  };
  return (
    <form className="filter-form" onSubmit={handleSubmit}>
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
      />
      <h4>
        Vous filtrer dans <code>{metric1.name}</code> sur les x et{" "}
        <code>{metric2.name}</code> sur les y
      </h4>
      <p>{filteredModels.length} modèles sélectionnés</p>

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

      <button onClick={handleValidate} type="submit">
        Valider
      </button>
    </form>
  );
}

export default FilterForm;
