import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";

export const Options = ({ optionType }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function getDataFromSV() {
      try {
        const result = await axios.get(`http://localhost:3030/${optionType}`);
        setData(result.data);
      } catch (err) {
        //Error handling
        console.log(data);
      }
    })();
  }, [optionType]);

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
