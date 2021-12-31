import axios from 'axios';
import { APP_PHASE } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Options } from './Options';
import { ScoopOption } from './ScoopOption';

export const OrderEntry = ({ setAppPhase }) => {
  const [orderDetail] = useOrderDetails();

  const handleOrderSundae = async () => setAppPhase(APP_PHASE.REVIEW);

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetail.totals.grandTotal}</h2>
      <button onClick={handleOrderSundae}>Order Sundae!</button>
    </div>
  );
};
