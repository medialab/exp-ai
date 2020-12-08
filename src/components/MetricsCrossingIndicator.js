import React from "react"; /* eslint no-unused-vars : 0 */
import cx from "classnames";
import Tooltip from "react-tooltip";

import { metricsColorMap } from "../helpers/misc";

import "./MetricsCrossingIndicator.scss";
import InfoTip from "./InfoTip";

function MetricsCrossingIndicator({ metrics }) {
  return (
    <div className="metrics-crossing-indicator">
      <ul className="crossing-indicator-items">
        {metrics.map((metric) => (
          <li
            className={cx("crossing-indicator-item", { active: metric.active })}
            key={metric.name}
            style={{
              background: metricsColorMap[metric.id],
            }}
          >
            {metric.name}{" "}
            <InfoTip
              data-place="right"
              data-effect="solid"
              tip={metric.short_description}
            />
          </li>
        ))}
      </ul>
      <Tooltip />
    </div>
  );
}

export default MetricsCrossingIndicator;
