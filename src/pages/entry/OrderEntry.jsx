import { Options } from "./Options";
import { ScoopOption } from "./ScoopOption";

export const OrderEntry = ({}) => {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
};
