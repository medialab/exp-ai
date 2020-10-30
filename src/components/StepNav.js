import React, {
  useState,
  useMemo,
} from "react"; /* eslint no-unused-vars : 0 */
import cx from "classnames";

import "./StepNav.scss";

function StepNav({ currentStep, numberOfSteps, setCurrentStep }) {
  const [steps, setSteps] = useState([]);
  useMemo(() => {
    let newSteps = new Array(numberOfSteps);
    for (let i = 0; i < newSteps.length; i++) {
      newSteps[i] = i;
    }
    setSteps(newSteps);
  }, [numberOfSteps]);

  return (
    <nav className="step-nav">
      <ul className="step-nav-items-container">
        {steps.map((_s, index) => (
          <li
            className={cx("step-nav-item", { active: index === currentStep })}
            onClick={() => setCurrentStep(index)}
            key={index}
          />
        ))}
      </ul>
    </nav>
  );
}

export default StepNav;
