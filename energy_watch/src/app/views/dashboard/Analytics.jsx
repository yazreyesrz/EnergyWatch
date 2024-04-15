import { Fragment, useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import RowCards from "./shared/RowCards";
import StatCards from "./shared/StatCards";
import Campaigns from "./shared/Campaigns";
import StatCards2 from "./shared/StatCards2";
import LineChart from "../charts/echarts/LineChart";
import UpgradeCard from "./shared/UpgradeCard";
import TopSellingTable from "./shared/TopSellingTable";
import io from "socket.io-client";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

export default function Analytics() {
  const { palette } = useTheme();

  const socket = io("http://localhost:5555"); // Asegúrate de cambiar la URL por la de tu servidor WebSocket.

  const [data, setData] = useState({
    voltaje: "",
    temperatura: "",
    corriente: "",
  });

  useEffect(() => {
    socket.on("IncomingData", (msg) => {
      const { topic, message } = msg;

      switch (topic) {
        case "casa/voltaje":
          setData((prev) => ({ ...prev, voltaje: message }));
          break;
        case "casa/temperatura":
          setData((prev) => ({ ...prev, temperatura: message }));
          break;
        case "casa/corriente":
          setData((prev) => ({ ...prev, corriente: message }));
          break;
        default:
          console.log("Topic not recognized:", topic);
      }
    });

    return () => {
      socket.off("IncomingData");
    };
  }, []);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
            <TopSellingTable />
            <StatCards2 />

            <H4>Graficos en tiempo real</H4>

            <LineChart height="550px" />
            {/* Mostrando datos */}
            <H4>Voltaje: {data.voltaje}V</H4>
            <H4>Temperatura: {data.temperatura}°C</H4>
            <H4>Corriente: {data.corriente}A</H4>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Grafica de Monitoreo</Title>
              <SubTitle>Tiempo real</SubTitle>

              {/* <LineChart height="550px" /> */}
            </Card>

            <UpgradeCard />
            <Campaigns />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
