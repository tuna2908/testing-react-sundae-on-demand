import { useOrderDetails } from '../../contexts/OrderDetails';
import { Options } from './Options';
import { ScoopOption } from './ScoopOption';

export const OrderEntry = ({}) => {
  const [orderDetail] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetail.totals.grandTotal}</h2>
    </div>
  );
};
