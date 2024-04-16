import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactEcharts from "echarts-for-react";
import io from "socket.io-client";

export default function LineChart({ height }) {
  const theme = useTheme();
  const [data, setData] = useState({
    voltaje: [],
    temperatura: [],
    corriente: [],
  });

  useEffect(() => {
    const socket = io("http://localhost:5555"); // Cambia esto por la URL de tu servidor WebSocket
    socket.on("IncomingData", (msg) => {
      const { topic, message } = msg;
      setData((prevData) => ({
        ...prevData,
        [topic.split("/")[1]]: [
          ...prevData[topic.split("/")[1]],
          parseFloat(message),
        ],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const option = {
    grid: { top: "10%", bottom: "10%", left: "5%", right: "5%" },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily,
      },
    },
    xAxis: {
      type: "category",
      data: data.voltaje.map((_, index) => index),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: "roboto",
      },
    },
    series: [
      {
        data: data.temperatura,
        type: "line",
        name: "Temperatura",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
}
