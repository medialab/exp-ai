import react from "react";
import { Transition } from "react-transition-group";

const visibleStyle = {
  opacity: 1,
  maxHeight: "calc(100vh - 4rem)",
  minHeight: "calc(100vh - 4rem)",
};
const hiddenStyle = {
  opacity: 0,
  maxHeight: 0,
  minHeight: 0,
};

const transitionStyles = {
  entering: visibleStyle,
  entered: visibleStyle,
  exiting: hiddenStyle,
  exited: hiddenStyle,
};
const duration = 300;

function StepContainer({ children, active, style = {}, ...otherProps }) {
  return (
    <Transition in={active} timeout={duration}>
      {(state) => (
        <div
          className="step-container"
          {...otherProps}
          style={{
            ...style,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}

export default StepContainer;
