import ReactEcharts from "echarts-for-react";

export default function DoughnutChart({
  height,
  color = ["#FF8300", "#00FF00", "#FF8300"],
}) {
  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: "circle",
      bottom: 0,
      textStyle: {
        color: "#333", // Color del texto de la leyenda
        fontSize: 13,
        fontFamily: "roboto",
      },
    },
    // Resto del código...

    series: [
      {
        name: "Grafica de Monitoreo",
        type: "pie",
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: "center",
            textStyle: {
              color: "#333", // Color del texto en la etiqueta
              fontSize: 13,
              fontFamily: "roboto",
            },
            formatter: "{a}",
          },
          emphasis: {
            show: true,
            textStyle: { fontSize: "14", fontWeight: "normal" },
            formatter: "{b} \n{c} ({d}%)",
          },
        },
        labelLine: { normal: { show: false } },
        data: [
          { value: 65, name: "Temperatura" },
          { value: 20, name: "Volataje" },
          { value: 15, name: "Electricidad" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{ ...option, color: [...color] }}
    />
  );
}
