import { Fragment, useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import StatCards from "./shared/StatCards";
import TopSellingTable from "./shared/TopSellingTable";
import StatCards2 from "./shared/StatCards2";
import LineChartGeneral from "../charts/echarts/LineChartGeneral";
import UpgradeCard from "./shared/UpgradeCard";
import Campaigns from "./shared/Campaigns";
import axios from "axios";
import io from "socket.io-client";

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
  const socket = io("http://localhost:5555");
  const [data, setData] = useState({
    voltaje: "",
    temperatura: "",
    corriente: "",
    alertaTemperatura: false,
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
          if (message > 33) {
            setData((prev) => ({ ...prev, alertaTemperatura: true }));
            sendAlertEmail();
          } else {
            setData((prev) => ({ ...prev, alertaTemperatura: false }));
          }
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

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User from localStorage:", user);
    const parsedUser = JSON.parse(user);
    // Resto del código...
  }, []);

  const sendAlertEmail = async () => {
    try {
      const user = localStorage.getItem("user");
      if (!user) {
        throw new Error("User data not found in localStorage.");
      }
      const { nombre, correo } = JSON.parse(user);
      console.log(nombre, correo);
      await axios.post("http://localhost:4000/usuarios/mail", {
        user: nombre,
        to: correo,
      });

      console.log("Alert email sent successfully.");
    } catch (error) {
      console.error("Error sending alert email:", error);
    }
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
            <TopSellingTable />
            <StatCards2 />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <UpgradeCard />
            <Campaigns />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
