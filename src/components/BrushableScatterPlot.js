import react, {
  useEffect,
  useRef,
  useState,
} from "react"; /* eslint no-unused-vars : 0 */
import { extent, min, max } from "d3-array";
import { scaleLinear } from "d3-scale";
import cx from "classnames";
import { Axis, axisPropsFromTickScale, LEFT, BOTTOM } from "react-d3-axis";

import metrics from "../contents/metrics_list.fr.yml";

import { DECIMALS } from "../constants";

import "./BrushableScatterPlot.scss";

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
  readOnly = false,
  minified = false,
  highlightedNodeId,

  ...props
}) {
  const [[xMin, xMax], setXRange] = useState([xMinOriginal, xMaxOriginal]);
  const [[yMin, yMax], setYRange] = useState([yMinOriginal, yMaxOriginal]);
  const numberOfTicks = minified ? 3 : 10;
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

  const handleMouseDown = (e) => {
    if (readOnly) return;
    setIsBrushing(true);
    setHoveredElement(undefined);
    const svgDims = svgRef.current.getBoundingClientRect();
    const thatX = xScale.invert(e.clientX - svgDims.x);
    const thatY = yScale.invert(e.clientY - svgDims.y);
    setXRange([thatX, thatX]);
    setYRange([thatY, thatY]);
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (readOnly) return;
      if (isBrushing) {
        const svgDims = svgRef.current.getBoundingClientRect();
        const thatX = xScale.invert(e.clientX - svgDims.x);
        const thatY = yScale.invert(e.clientY - svgDims.y);
        setXRange([xMin, thatX]);
        setYRange([yMin, thatY]);
      }
    };

    const handleMouseUp = () => {
      if (readOnly) return;
      if (isBrushing && xMin !== xMax && yMin !== yMax) {
        onBrushChange({
          x: [
            +xMin.toFixed ? +xMin.toFixed(DECIMALS) : +xMin,
            +xMax.toFixed ? +xMax.toFixed(DECIMALS) : +xMax,
          ].sort(),
          y: [
            +yMin.toFixed ? +yMin.toFixed(DECIMALS) : +yMin,
            +yMax.toFixed ? +yMax.toFixed(DECIMALS) : +yMax,
          ].sort(),
        });
      } else {
        setXRange([xMinOriginal, xMaxOriginal]);
        setYRange([yMinOriginal, yMaxOriginal]);
      }
      setIsBrushing(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isBrushing, xMin, xMax, yMin, yMax]);

  const brushX =
    xScale(min([xMin, xMax])) < axisMargin + padding
      ? axisMargin + padding
      : xScale(min([xMin, xMax]));
  const brushWidth = xScale(max([xMin, xMax])) - brushX; // Math.abs(xScale(xMax) - xScale(xMin));
  const brushY =
    yScale(min([yMin, yMax])) - Math.abs(yScale(yMax) - yScale(yMin));
  let brushHeight = Math.abs(yScale(yMax) - yScale(yMin));
  brushHeight =
    brushHeight + brushY > height - axisMargin - padding
      ? height - axisMargin - padding - brushY
      : brushHeight;
  return (
    <div className="brushable-scatterplot-container" {...props}>
      <svg
        width={width}
        height={height}
        ref={svgRef}
        className={cx("brushable-scatterplot", {
          "is-brushing": isBrushing,
          "is-readonly": readOnly,
          "is-minified": minified,
        })}
        onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
      >
        <g
          transform={`translate(0, ${height - axisMargin - padding})`}
          className="x-axis"
        >
          <Axis
            {...axisPropsFromTickScale(xScale, numberOfTicks)}
            style={{ orient: BOTTOM }}
          />
        </g>
        <g
          transform={`translate(${axisMargin + padding}, 0)`}
          className="y-axis"
        >
          <Axis
            {...axisPropsFromTickScale(yScale, numberOfTicks)}
            style={{ orient: LEFT }}
          />
        </g>
        {xMin && xMax && yMin && yMax ? (
          <rect
            x={brushX}
            y={brushY}
            width={brushWidth}
            height={brushHeight}
            className="brush"
          />
        ) : null}
        <g className="chart">
          {data.map((datum, index) => {
            const handleOvered = () => {
              if (
                !readOnly &&
                !minified &&
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
                !readOnly &&
                !minified &&
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
                className={cx("dot", {
                  "is-active": active,
                  "is-highlighted":
                    highlightedNodeId && highlightedNodeId === datum.id,
                })}
                onMouseEnter={handleOvered}
                onMouseMove={handleOvered}
                onMouseLeave={handleLeave}
                key={datum.id}
                r={width / 200}
              />
            );
          })}
        </g>
      </svg>
      {
        <div
          className={cx("chart-tooltip", { "is-active": hoveredElement })}
          style={{
            left: tooltipPosition[0],
            top: tooltipPosition[1],
          }}
        >
          {hoveredElement && !readOnly && !minified && (
            <ul>
              {metrics.map(({ id, name }) => {
                let val = hoveredElement[id];
                val = parseFloat(val).toFixed(DECIMALS);
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
                      : val}
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
