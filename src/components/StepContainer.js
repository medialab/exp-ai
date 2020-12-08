import react, {
  useRef,
  useEffect,
} from "react"; /* eslint no-unused-vars : 0 */
import { Transition } from "react-transition-group";
import cx from "classnames";

import "./StepContainer.scss";

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
  const nodeRef = useRef(null);
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        document.querySelector("html").scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [active]);
  return (
    <Transition nodeRef={nodeRef} in={active} timeout={duration}>
      {(state) => (
        <div
          className={cx("step-container", state)}
          ref={nodeRef}
          {...otherProps}
          style={{
            ...style,
            // ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}

export default StepContainer;
