import { useEffect } from 'react';
import { createContext, useContext, useState, useMemo } from 'react';
import { PRICE_PER_ITEM } from '../constants';
const OrderDetails = createContext(null);

//create custom hook to check inside a provider
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) throw new Error('context not within Provider');

  return context;
};

const calculateSubtotal = (optionType, optionsCounts) => {
  let optionCount = 0;

  for (const count of optionsCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * PRICE_PER_ITEM[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);
  //contrl + D, pay the deal
  const [totals, setTotal] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);

    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotal({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with new value
      const optionCountsMap = newOptionCounts[optionType];

      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }
    // getter: object containing option counts for scoops and topping, subtotal and total
    // setter: updateOptionCount
    function resetValue() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
      setTotal({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
      });
    }

    return [{ ...optionCounts, totals }, updateItemCount, resetValue];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
