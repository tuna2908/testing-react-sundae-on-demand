import { useEffect } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';

export const OrderSummary = ({}) => {
  const [orderDetails] = useOrderDetails();

  const { totals, scoops, toppings } = orderDetails;

  const MappedScoopInfo = [...scoops.keys()].map((scoop, index) => (
    <li key={'s' + index}>
      {scoops.get(scoop)} {scoop}
    </li>
  ));
  const MappedToppingInfo = [...toppings.keys()].map((topping, index) => (
    <li key={'s' + index}>
      {toppings.get(topping)} {topping}
    </li>
  ));

  return (
    <div>
      <h2>Scoops: {totals.scoops}</h2>
      {MappedScoopInfo}
      <h2>Toppings: {totals.toppings}</h2>
      {MappedToppingInfo}
      <h2>Totals {totals.grandTotal}</h2>
    </div>
  );
};
