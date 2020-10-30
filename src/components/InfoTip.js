import react from "react"; /* eslint no-unused-vars : 0 */
import "./InfoTip.scss";
function InfoTip({ tip, ...props }) {
  return (
    <span
      className="info-tip"
      data-effect={props.dataEffect || "solid"}
      data-tip={tip}
      {...props}
    >
      <span>?</span>
    </span>
  );
}
export default InfoTip;
