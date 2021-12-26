import { useState } from "react";

export const SummaryForm = () => {
  const [cbStatus, setCBStatus] = useState(false);
  const handleCBClick = (e) => setCBStatus(e.target.checked);

  return (
    <div>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        onClick={handleCBClick}
      />
      <label htmlFor="disable-button-checkbox">
        I agree to Terms and Conditions
      </label>
      <button disabled={!cbStatus}>Confirm order</button>
    </div>
  );
};
