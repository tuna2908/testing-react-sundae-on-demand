import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

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

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
);

export const BootstrapSummaryForm = () => {
  const [cbStatus, setCBStatus] = useState(false);
  const handleCBClick = (e) => setCBStatus(e.target.checked);
  //wanna add label to checkbox => add this one: <Form.Group controlId="terms-and-conditions">
  //placement="right" is important
  const Label = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check type="checkbox" onChange={handleCBClick} label={Label} />
      </Form.Group>
      <button disabled={!cbStatus}>Confirm order</button>
    </Form>
  );
};
