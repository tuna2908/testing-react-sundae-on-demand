import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { PRICE_PER_ITEM } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { AlertBanner } from '../common/AlertBanner';
import { ScoopOption } from './ScoopOption';
import { ToppingOption } from './ToppingOption';

export const Options = ({ optionType }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    (async function getDataFromSV() {
      try {
        const result = await axios.get(`http://localhost:3030/${optionType}`);
        setData(result.data);
      } catch (err) {
        //Error handling
        setError(true);
      }
    })();
  }, [optionType]);

  if (error) return <AlertBanner />;

  //   const OptionItem = optionType === "scoops" ? <ScoopOption /> : null; //wrongly defined
  const OptionItem = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase(); //capitalize first letter

  const MappedOptionItems = data.map((option) => (
    <OptionItem
      key={option.name}
      name={option.name}
      imagePath={option.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{PRICE_PER_ITEM[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{MappedOptionItems}</Row>
    </>
  );
};
