import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const LineChart = ({ tradeHistory }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tradeHistory);
  }, [tradeHistory]);

  const config = {
    data,
    padding: "auto",
    xField: "dateWithTime",
    yField: "price",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.0,
      end: 1.0,
    },
    theme: {
      colors10: [
        "#FF6B3B",
        "#626681",
        "#FFC100",
        "#9FB40F",
        "#76523B",
        "#DAD5B5",
        "#0E8E89",
        "#E19348",
        "#F383A2",
        "#247FEA",
      ],
      styleSheet: {
        fontFamily: "Avenir",
      },
    },
  };

  return <Line {...config} />;
};

export default LineChart;
