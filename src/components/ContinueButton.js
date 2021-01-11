import React from "react"; /* eslint no-unused-vars : 0 */
import translate from "../helpers/translate";
import cx from "classnames";

function ContinueButton({
  currentStep,
  onSetCurrentStep,
  onPreviousStep,
  disabled,
  backwardEnabled,
  onSubmit,
  submitMessage,
  relativePosition,
  ...props
}) {
  const onNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onSubmit === "function") {
      onSubmit();
    } else {
      onSetCurrentStep(currentStep + 1);
    }
  };
  const onPrevious = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onPreviousStep === "function") {
      onPreviousStep();
    } else {
      onSetCurrentStep(currentStep - 1);
    }
  };
  return (
    <div
      className={cx("continue-button-container", {
        "backward-enabled": backwardEnabled,
        "relative-position": relativePosition,
      })}
    >
      <button
        disabled={disabled}
        onClick={onNext}
        className="continue-button next"
        {...props}
        type="button"
      >
        {submitMessage || translate("next_step")}
      </button>

      {backwardEnabled ? (
        <button
          onClick={onPrevious}
          className="continue-button previous"
          type="button"
        >
          {translate("previous_step")}
        </button>
      ) : null}
    </div>
  );
}

export default ContinueButton;
