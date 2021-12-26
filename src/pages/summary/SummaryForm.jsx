import { useState } from "react";
import { Form } from "react-bootstrap";

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

export const BootstrapSummaryForm = () => {
  const [cbStatus, setCBStatus] = useState(false);
  const handleCBClick = (e) => setCBStatus(e.target.checked);
  //wanna add label to checkbox => add this one: <Form.Group controlId="terms-and-conditions">
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          onChange={handleCBClick}
          label={"I agree to Terms and Conditions"}
        />
      </Form.Group>
      <button disabled={!cbStatus}>Confirm order</button>
    </Form>
  );
};
