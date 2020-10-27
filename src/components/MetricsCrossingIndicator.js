import react from "react";
import cx from "classnames";

import "./MetricsCrossingIndicator.scss";

function MetricsCrossingIndicator({ metrics }) {
  return (
    <div className="metrics-crossing-indicator">
      <ul className="crossing-indicator-items">
        {metrics.map((metric) => (
          <li
            className={cx("crossing-indicator-item", { active: metric.active })}
            key={metric.name}
          >
            {metric.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MetricsCrossingIndicator;
