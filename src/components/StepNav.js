import React, {
  useState,
  useMemo,
} from "react"; /* eslint no-unused-vars : 0 */
import cx from "classnames";

import "./StepNav.scss";

function StepNav({ currentStep, setCurrentStep, steps }) {
  return (
    <nav className="step-nav">
      <ul className="step-nav-items-container">
        {Object.entries(steps).map(([index, step]) => (
          <li
            className={cx("step-nav-item", {
              active: +index === currentStep,
              disabled: step.disabled,
            })}
            onClick={() => setCurrentStep(+index)}
            key={index}
            data-for="tooltip"
            data-tip={step.title}
            data-effect="solid"
            data-place="left"
          />
        ))}
      </ul>
    </nav>
  );
}

export default StepNav;
