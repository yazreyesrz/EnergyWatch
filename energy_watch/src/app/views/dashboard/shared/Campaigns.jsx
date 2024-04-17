import Box from "@mui/material/Box";
import { Small } from "app/components/Typography";
import { MatxProgressBar, SimpleCard } from "app/components";
import io from "socket.io-client";
import { Fragment, useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";

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

export default function Campaigns() {
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
          if (message > 45) {
            setData((prev) => ({ ...prev, alertaTemperatura: true }));
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
  return (
    <Box>
      <SimpleCard title="Monitoreo">
        {/* Mostrando datos */}
        <H4>Voltaje: {data.voltaje}V</H4>
        <H4>Temperatura: {data.temperatura}°C</H4>
        <H4>Corriente: {data.corriente}A</H4>

        {/* Mostrar alerta de sobrecalentamiento si es necesario */}
        {data.alertaTemperatura && (
          <Card
            sx={{
              px: 3,
              py: 2,
              mb: 3,
              backgroundColor: palette.error.light,
            }}
          >
            <Title>¡Alerta de Sobrecalentamiento!</Title>
            <SubTitle>La temperatura ha alcanzado más de 45°C.</SubTitle>
            <SubTitle>
              ¡Por favor, toma acciones para evitar problemas!
            </SubTitle>
          </Card>
        )}
      </SimpleCard>
    </Box>
  );
}
