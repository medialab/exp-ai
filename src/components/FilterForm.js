import react, {
  // useCallback,
  useEffect,
  useState,
} from "react"; /* eslint no-unused-vars : 0 */
import { min, max } from "d3-array";
import Tooltip from "react-tooltip";
import Dimensions from "react-dimensions";
import cx from "classnames";
import "./FilterForm.scss";

import BrushableScatterPlot from "./BrushableScatterPlot";
import VariableInputs from "./VariableInputs";
import ContinueButton from "./ContinueButton";

import { useDebounce } from "../helpers/hooks";
import { filterModels } from "../helpers/filters";
import variables from "../contents/variables_list.fr.yml";
import { DECIMALS } from "../constants";
import InfoTip from "./InfoTip";
import translate from "../helpers/translate";

function FilterForm({
  metrics,
  models,
  onSubmit,
  onPreviousStep,
  filters = [],
  privacyVariables,
  values,
  containerWidth,
  containerHeight,
  onChange,
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

  const [xOptionsVisible, setXOptionsVisible] = useState(false);
  const [yOptionsVisible, setYOptionsVisible] = useState(false);

  const [filteredModels, setFilteredModels] = useState(models);

  const [hasChoosen, setHasChoosen] = useState(
    values && values.length > 1 ? true : false
  );

  useEffect(() => {
    if (!models.length) return null;
    if (values && values.length > 1) {
      setChoosenMin1(values[0] ? values[0].range[0] : absoluteMin1);
      setChoosenMax1(values[0] ? values[0].range[1] : absoluteMax1);
      setChoosenMin2(values[1] ? values[1].range[0] : absoluteMin2);
      setChoosenMax2(values[1] ? values[1].range[1] : absoluteMax2);
    } else {
      setChoosenMin1(absoluteMin1);
      setChoosenMax1(absoluteMax1);
      setChoosenMin2(absoluteMin2);
      setChoosenMax2(absoluteMax2);
    }
  }, [values]); /* eslint react-hooks/exhaustive-deps : 0 */

  // useDebounce(
  useEffect(
    () => {
      if (!models.length) return null;
      if (!metric1 || !metric2) {
        return null;
      }

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
    if (!metric1 || !metric2) {
      return null;
    }
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
    // setAbsoluteMin1(+absMin1.toFixed(DECIMALS));
    // setAbsoluteMax1(+absMax1.toFixed(DECIMALS));
    // setAbsoluteMin2(+absMin2.toFixed(DECIMALS));
    // setAbsoluteMax2(+absMax2.toFixed(DECIMALS));
    setAbsoluteMin1(+absMin1);
    setAbsoluteMax1(+absMax1);
    setAbsoluteMin2(+absMin2);
    setAbsoluteMax2(+absMax2);

    if (!values) {
      if (
        choosenMin1 !== absMin1 ||
        choosenMax1 !== absMax1 ||
        choosenMin2 !== absMin2 ||
        choosenMax2 !== absMax2
      ) {
        setChoosenMin1(absMin1);
        setChoosenMax1(absMax1);
        setChoosenMin2(absMin2);
        setChoosenMax2(absMax2);
      }
      // setChoosenMin1(+absMin1.toFixed(DECIMALS));
      // setChoosenMax1(+absMax1.toFixed(DECIMALS));
      // setChoosenMin2(+absMin2.toFixed(DECIMALS));
      // setChoosenMax2(+absMax2.toFixed(DECIMALS));
    } else if (!values[0]) {
      setChoosenMin1(absMin1);
      setChoosenMax1(absMax1);
    } else if (!values[1]) {
      setChoosenMin2(absMin2);
      setChoosenMax2(absMax2);
    }
  }, [models, metrics]);

  useEffect(() => {
    if (!models.length) return null;
    if (!metric1 || !metric2) {
      return null;
    }
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

  if (!metric1 || !metric2) {
    return null;
  }

  if (!models.length) return null;

  const handleValidate = (e) => {
    const values = [
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
    onSubmit(values);
  };
  const handleBrushChange = ({
    x: [thatXMin, thatXMax],
    y: [thatYMin, thatYMax],
  }) => {
    setChoosenMin1(+thatXMin.toFixed(DECIMALS));
    setChoosenMax1(+thatXMax.toFixed(DECIMALS));
    setChoosenMin2(+thatYMin.toFixed(DECIMALS));
    setChoosenMax2(+thatYMax.toFixed(DECIMALS));
    setHasChoosen(true);

    if (typeof onChange === "function") {
      const values = [
        {
          variable: metric1.id,
          type: "range",
          range: [+thatXMin.toFixed(DECIMALS), +thatXMax.toFixed(DECIMALS)],
          variables: metric1.id === "Privacy" ? filteredVariables : undefined,
        },
        {
          variable: metric2.id,
          type: "range",
          range: [+thatYMin.toFixed(DECIMALS), +thatYMax.toFixed(DECIMALS)],
          variables: metric2.id === "Privacy" ? filteredVariables : undefined,
        },
      ];
      onChange(values);
    }
  };

  return (
    <div className="filter-form">
      <div className="columns-container">
        <div className="column is-main">
          <div
            className={cx("axis-container axis-y", {
              "is-deployed": yOptionsVisible,
            })}
          >
            <VariableInputs
              metric={metric2}
              values={[choosenMin2, choosenMax2]}
              min={absoluteMin2}
              max={absoluteMax2}
              onLabelClick={() => setYOptionsVisible(!yOptionsVisible)}
              filteredVariables={filteredVariables}
              axis={"y"}
              onRangeChange={([thatMin, thatMax]) => {
                setChoosenMin2(thatMin);
                setChoosenMax2(thatMax);
                setHasChoosen(true);
                if (typeof onChange === "function") {
                  const values = [
                    {
                      variable: metric1.id,
                      type: "range",
                      range: [choosenMin1, choosenMax1],
                      variables:
                        metric1.id === "Privacy"
                          ? filteredVariables
                          : undefined,
                    },
                    {
                      variable: metric2.id,
                      type: "range",
                      range: [+thatMin, +thatMax],
                      variables:
                        metric2.id === "Privacy"
                          ? filteredVariables
                          : undefined,
                    },
                  ];
                  onChange(values);
                }
              }}
            />
          </div>
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
            width={containerWidth * 0.85}
            height={400}
            style={{
              paddingLeft: containerWidth * 0.1,
            }}
          />
          <div
            className={cx("axis-container axis-x", {
              "is-deployed": xOptionsVisible,
            })}
          >
            <VariableInputs
              metric={metric1}
              values={[choosenMin1, choosenMax1]}
              min={absoluteMin1}
              max={absoluteMax1}
              axis={"x"}
              onLabelClick={() => setXOptionsVisible(!xOptionsVisible)}
              filteredVariables={filteredVariables}
              onRangeChange={([thatMin, thatMax]) => {
                setChoosenMin1(thatMin);
                setChoosenMax1(thatMax);
                setHasChoosen(true);
                if (typeof onChange === "function") {
                  const values = [
                    {
                      variable: metric1.id,
                      type: "range",
                      range: [+thatMin, +thatMax],
                      variables:
                        metric1.id === "Privacy"
                          ? filteredVariables
                          : undefined,
                    },
                    {
                      variable: metric2.id,
                      type: "range",
                      range: [choosenMin2, choosenMax2],
                      variables:
                        metric2.id === "Privacy"
                          ? filteredVariables
                          : undefined,
                    },
                  ];
                  onChange(values);
                }
              }}
            />
          </div>
          {/*<h4>
            Vous filtrez dans{" "}
            <code>
              {metric1.name} <InfoTip tip={metric1.short_description} />
            </code>{" "}
            sur les x et{" "}
            <code>
              {metric2.name} <InfoTip tip={metric2.short_description} />
            </code>{" "}
            sur les y
          </h4>*/}
          <div
            style={{
              // position: 'absolute',
              // top: 0,
              // right: 0,
              // bottom: '1rem',
              // paddingLeft: containerWidth * .15,
              maxWidth: containerWidth * 0.4,
            }}
            className="count-container"
          >
            <p>
              <span className="count-indicator">{filteredModels.length}</span>{" "}
              modèles sélectionnés.
            </p>
            <p>
              <i>Faire glisser la souris pour sélectionner des modèles.</i>
            </p>
          </div>
        </div>
      </div>

      <ContinueButton
        disabled={!filteredModels.length || !hasChoosen}
        onSubmit={handleValidate}
        submitMessage={translate("validate")}
        onPreviousStep={onPreviousStep}
        backwardEnabled
      />

      <Tooltip id="tip" />
    </div>
  );
}

export default Dimensions()(FilterForm);
