import React from "react";
import BrushableScatterPlot from "./BrushableScatterPlot";
import Slider from "rc-slider";
import { min, max } from "d3-array";

import { metricsColorMap } from "../helpers/misc";

import metricsList from "../contents/metrics_list.fr.yml";
import "./MiniGraph.scss";

const Range = Slider.createSliderWithTooltip(Slider.Range);

const MiniGraph = ({
  index,
  filters,
  models,
  from,
  to,
  onNav,
  fromName,
  toName,
  variables,
  choosenModel,
  highlightedNodeId,
  addFilters,
  filterModels,
  readOnly,
}) => {
  const actuallyHighlitedNodeId = choosenModel
    ? highlightedNodeId || choosenModel.id
    : highlightedNodeId;

  const brushData = {
    x: filters[from + ""].range,
    y: filters[to + ""].range,
  };
  const data =
    from === 0
      ? models
      : filterModels(
          models,
          Object.entries(filters)
            .filter(([key]) => +key < from)
            .map(([_key, filter]) => filter)
        );

  const handleBrushChange = ({
    x: [thatXMin, thatXMax],
    y: [thatYMin, thatYMax],
  }) => {
    addFilters({
      [from + ""]: {
        ...filters[from + ""],
        range: [thatXMin, thatXMax],
      },
      [to + ""]: {
        ...filters[to + ""],
        range: [thatYMin, thatYMax],
      },
    });
  };
  const SLIDER_MULTIPLIER = 10000;

  const handleRangeChange = (axis, range) => {
    const key = axis === "x" ? from + "" : to + "";
    if (axis === "x") {
      console.log("on change", { range });
    }
    addFilters({
      [key]: {
        ...filters[key],
        range,
      },
    });
  };
  const val1 = filters[from + ""].range;
  const xVariable = filters[from + ""].variable;
  const metric1 = metricsList.find(({ id }) => id === xVariable);
  const min1 = min(data, (d) => +d[xVariable]);
  const max1 = max(data, (d) => +d[xVariable]);

  const val2 = filters[to + ""].range;
  const yVariable = filters[to + ""].variable;
  const metric2 = metricsList.find(({ id }) => id === yVariable);
  const min2 = min(data, (d) => +d[yVariable]);
  const max2 = max(data, (d) => +d[yVariable]);
  return (
    <div className="mini-graph-container">
      <h5 className="mini-graph-title">
        <div>
          <span onClick={onNav} className="number-indicator">
            {index + 1}
          </span>
        </div>
        <div className="values-container">
          <span className="value-container">
            <code
              style={{
                background: metricsColorMap[xVariable],
              }}
            >
              {fromName}
            </code>
            <Range
              allowCross={false}
              tipFormatter={(val) => val / SLIDER_MULTIPLIER}
              onChange={([thatMin, thatMax]) => {
                handleRangeChange("x", [
                  thatMin / SLIDER_MULTIPLIER,
                  thatMax / SLIDER_MULTIPLIER,
                ]);
              }}
              step={metric1.type === "integer" ? SLIDER_MULTIPLIER : undefined}
              min={min1 * SLIDER_MULTIPLIER}
              max={max1 * SLIDER_MULTIPLIER}
              defaultValue={[
                min1 * SLIDER_MULTIPLIER,
                max1 * SLIDER_MULTIPLIER,
              ]}
              value={[val1[0] * SLIDER_MULTIPLIER, val1[1] * SLIDER_MULTIPLIER]}
              style={{
                width: "100%",
              }}
            />
          </span>
          <span className="value-container">
            <code
              style={{
                background: metricsColorMap[yVariable],
              }}
            >
              {toName}
            </code>
            <Range
              allowCross={false}
              tipFormatter={(val) => val / SLIDER_MULTIPLIER}
              onChange={([thatMin, thatMax]) => {
                handleRangeChange("y", [
                  thatMin / SLIDER_MULTIPLIER,
                  thatMax / SLIDER_MULTIPLIER,
                ]);
              }}
              step={metric2.type === "integer" ? SLIDER_MULTIPLIER : undefined}
              min={min2 * SLIDER_MULTIPLIER}
              max={max2 * SLIDER_MULTIPLIER}
              defaultValue={[
                min2 * SLIDER_MULTIPLIER,
                max2 * SLIDER_MULTIPLIER,
              ]}
              value={[val2[0] * SLIDER_MULTIPLIER, val2[1] * SLIDER_MULTIPLIER]}
              style={{
                width: "100%",
              }}
            />
          </span>
        </div>
      </h5>
      <BrushableScatterPlot
        data={data}
        xVariable={xVariable}
        yVariable={yVariable}
        filteredVariables={variables}
        brush={brushData}
        readOnly={readOnly}
        minified
        highlightedNodeId={actuallyHighlitedNodeId}
        width={200}
        height={200}
        onBrushChange={handleBrushChange}
      />
    </div>
  );
};

export default MiniGraph;
