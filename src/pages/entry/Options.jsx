import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AlertBanner } from "../common/AlertBanner";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";

export const Options = ({ optionType }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function getDataFromSV() {
      try {
        const result = await axios.get(`http://localhost:3030/${optionType}`);
        setData(result.data);
      } catch (err) {
        //Error handling
        setError(true);
        console.log(data);
      }
    })();
  }, [optionType]);

  if (error) return <AlertBanner />;

  //   const OptionItem = optionType === "scoops" ? <ScoopOption /> : null; //wrongly defined
  const OptionItem = optionType === "scoops" ? ScoopOption : ToppingOption;

  const MappedOptionItems = data.map((option) => (
    <OptionItem
      key={option.name}
      name={option.name}
      imagePath={option.imagePath}
    />
  ));

  return <div>{MappedOptionItems}</div>;
};
