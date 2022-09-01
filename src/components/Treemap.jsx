import React, { useState, useEffect } from "react";
import { Treemap } from "@ant-design/plots";

const TMCTreemap = ({ top100Collections }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const arrayOfObjects = top100Collections?.map((ele) => {
      let container = {};
      container.name = ele.collection_name;
      container.value = Math.round(
        ele.statistics.floor * ele.statistics.totalSupply
      );
      return container;
    });

    const newObject = {
      name: "root",
      children: [...arrayOfObjects],
    };

    setData(newObject);
  }, [top100Collections]);

  const config = {
    data,
    colorField: "name",
    theme: "dark",
    columnStyle: { cursor: "pointer" },
  };
  return <Treemap {...config} />;
};

export default TMCTreemap;
