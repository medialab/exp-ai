import react from "react";
import translate from "../helpers/translate";

function ContinueButton({ onClick, disabled }) {
  return (
    <div className="continue-button-container">
      <button disabled={disabled} onClick={onClick} className="continue-button">
        {translate("next_step")}
      </button>
    </div>
  );
}

export default ContinueButton;
