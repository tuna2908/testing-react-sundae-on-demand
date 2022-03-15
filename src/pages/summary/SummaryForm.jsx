import axios from "axios";
import { useState } from "react";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";
import { APP_PHASE } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { OrderSummary } from "./OrderSummary";

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

export const BootstrapSummaryForm = ({ setAppPhase, setOrderNumber }) => {
  const [cbStatus, setCBStatus] = useState(false);
  const handleCBClick = (e) => setCBStatus(e.target.checked);
  const [test, test2, resetValue] = useOrderDetails();
  //wanna add label to checkbox => add this one: <Form.Group controlId="terms-and-conditions">
  //placement="right" is important
  const handleSubmit = async () => {
    const result = await axios.post(`http://localhost:3030/order`);
    setOrderNumber(result.data.orderNumber);
    resetValue();
    setAppPhase(APP_PHASE.COMPLETE);
  };

  const Label = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <>
      <OrderSummary />
      <Form>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check type="checkbox" onChange={handleCBClick} label={Label} />
        </Form.Group>
      </Form>
      <button disabled={!cbStatus} onClick={handleSubmit}>
        Confirm order
      </button>
    </>
  );
};
