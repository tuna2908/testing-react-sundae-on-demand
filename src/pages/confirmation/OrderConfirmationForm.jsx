import { useEffect } from 'react';
import { APP_PHASE } from '../../constants';

export const OrderConfirmationForm = ({
  orderNumber = '123456',
  setAppPhase,
}) => {
  useEffect(() => {}, []);

  const handleOnClick = () => setAppPhase(APP_PHASE.IN_PROCESS);

  return (
    <div>
      <h3>THANK YOU!</h3>
      <p>Your order number is {orderNumber}</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      <button onClick={handleOnClick}>Create new order</button>
    </div>
  );
};
