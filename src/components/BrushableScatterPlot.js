import react, { useEffect, useRef, useState } from "react";
import { extent, min } from "d3-array";
import { scaleLinear } from "d3-scale";
import cx from "classnames";
import { Axis, axisPropsFromTickScale, LEFT, BOTTOM } from "react-d3-axis";

import metrics from "../contents/metrics_list.fr.yml";

function BrushableScatterPlot({
  data,
  xVariable,
  yVariable,
  filteredVariables,
  width = 500,
  height = 500,
  axisMargin = 30,
  padding = 10,
  brush: {
    x: [xMinOriginal, xMaxOriginal],
    y: [yMinOriginal, yMaxOriginal],
  },
  onBrushChange,
}) {
  const [[xMin, xMax], setXRange] = useState([xMinOriginal, xMaxOriginal]);
  const [[yMin, yMax], setYRange] = useState([yMinOriginal, yMaxOriginal]);
  useEffect(() => {
    setXRange([xMinOriginal, xMaxOriginal]);
    setYRange([yMinOriginal, yMaxOriginal]);
  }, [xMinOriginal, xMaxOriginal, yMinOriginal, yMaxOriginal]);
  const xAccessor = (d) =>
    xVariable === "Privacy"
      ? -d.variables.filter((vName) => filteredVariables.includes(vName)).length
      : +d[xVariable];
  const yAccessor = (d) =>
    yVariable === "Privacy"
      ? -d.variables.filter((vName) => filteredVariables.includes(vName)).length
      : +d[yVariable];
  let xExtent = extent(data, xAccessor);
  let yExtent = extent(data, yAccessor);
  const xScale = scaleLinear()
    .domain(xExtent)
    .range([axisMargin + padding, width - padding]);

  const yScale = scaleLinear()
    .domain(yExtent.reverse())
    .range([padding, height - axisMargin - padding]);

  const [hoveredElement, setHoveredElement] = useState(undefined);
  const [tooltipPosition, setTooltipPosition] = useState([0, 0]);
  const [isBrushing, setIsBrushing] = useState(false);

  const svgRef = useRef(null);

  return (
    <div className="brushable-scatterplot-container">
      <svg
        width={width}
        height={height}
        ref={svgRef}
        className={cx("brushable-scatterplot", { "is-brushing": isBrushing })}
        onMouseDown={(e) => {
          setIsBrushing(true);
          setHoveredElement(undefined);
          const svgDims = svgRef.current.getBoundingClientRect();
          const thatX = xScale.invert(e.clientX - svgDims.x);
          const thatY = yScale.invert(e.clientY - svgDims.y);
          setXRange([thatX, thatX]);
          setYRange([thatY, thatY]);
        }}
        onMouseMove={(e) => {
          if (isBrushing) {
            const svgDims = svgRef.current.getBoundingClientRect();
            const thatX = xScale.invert(e.clientX - svgDims.x);
            const thatY = yScale.invert(e.clientY - svgDims.y);
            setXRange([xMin, thatX]);
            setYRange([yMin, thatY]);
          }
        }}
        onMouseUp={() => {
          setIsBrushing(false);
          if (xMin !== xMax && yMin !== yMax) {
            onBrushChange({
              x: [xMin, xMax].sort(),
              y: [yMin, yMax].sort(),
            });
          } else {
            setXRange([xMinOriginal, xMaxOriginal]);
            setYRange([yMinOriginal, yMaxOriginal]);
          }
        }}
      >
        <g
          transform={`translate(0, ${height - axisMargin - padding})`}
          className="x-axis"
        >
          <Axis
            {...axisPropsFromTickScale(xScale, 10)}
            style={{ orient: BOTTOM }}
          />
        </g>
        <g
          transform={`translate(${axisMargin + padding}, 0)`}
          className="y-axis"
        >
          <Axis
            {...axisPropsFromTickScale(yScale, 10)}
            style={{ orient: LEFT }}
          />
        </g>
        <rect
          x={xScale(min([xMin, xMax]))}
          y={yScale(min([yMin, yMax])) - Math.abs(yScale(yMax) - yScale(yMin))}
          width={Math.abs(xScale(xMax) - xScale(xMin))}
          height={Math.abs(yScale(yMax) - yScale(yMin))}
          fill="rgba(0,0,0,0.5)"
        />
        <g className="chart">
          {data.map((datum, index) => {
            const handleOvered = () => {
              if (
                !isBrushing &&
                (!hoveredElement || hoveredElement.id !== datum.id)
              ) {
                setHoveredElement(datum);
                setTooltipPosition([
                  10 + xScale(xAccessor(datum)),
                  yScale(yAccessor(datum)),
                ]);
              }
            };
            const handleLeave = () => {
              if (
                !isBrushing &&
                hoveredElement &&
                hoveredElement.id === datum.id
              ) {
                setHoveredElement(undefined);
              }
            };
            const x = xAccessor(datum);
            const y = yAccessor(datum);
            const xExtent = [xMin, xMax].sort((a, b) => {
              if (a > b) {
                return 1;
              } else return -1;
            });
            const yExtent = [yMin, yMax].sort((a, b) => {
              if (a > b) {
                return 1;
              } else return -1;
            });
            const active =
              x >= xExtent[0] &&
              x <= xExtent[1] &&
              y >= yExtent[0] &&
              y <= yExtent[1];
            return (
              <circle
                cx={xScale(x)}
                cy={yScale(y)}
                className={cx("dot", { active: active })}
                onMouseEnter={handleOvered}
                onMouseMove={handleOvered}
                onMouseLeave={handleLeave}
                key={index}
                r={width / 200}
              />
            );
          })}
        </g>
      </svg>
      {
        <div
          className="chart-tooltip"
          style={{
            opacity: hoveredElement ? 1 : 0,
            left: tooltipPosition[0],
            top: tooltipPosition[1],
          }}
        >
          {hoveredElement && (
            <ul>
              {metrics.map(({ id, name }) => {
                return (
                  <li
                    key={id}
                    className={cx("tooltip-info", {
                      active: id === xVariable || id === yVariable,
                    })}
                  >
                    {name} :{" "}
                    {id === "Privacy"
                      ? -hoveredElement.variables.filter((vName) =>
                          filteredVariables.includes(vName)
                        ).length
                      : hoveredElement[id]}
                  </li>
                );
              })}
              <li>Variables : {hoveredElement.variables.join(", ")}</li>
            </ul>
          )}
        </div>
      }
    </div>
  );
}

export default BrushableScatterPlot;
