import { Box, styled, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Breadcrumb from "app/components/Breadcrumb";
import SimpleCard from "app/components/SimpleCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import ComparisonChart from "./ComparisonChart";

// STYLED COMPONENT
const Container = styled("div")(({ theme }) => ({
  margin: 30,
  [theme.breakpoints.down("sm")]: { margin: 16 },
  "& .breadcrumb": {
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: { marginBottom: 16 },
  },
}));

export default function AppEchart() {
  const { id } = useParams();
  const [buildingData, setBuildingData] = useState(null);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/edificios/one/${id}`
        );
        setBuildingData(response.data.edificio); // Asignar los datos del edificio a state
        console.log(response.data.edificio);
      } catch (error) {
        console.error("Error al obtener los datos del edificio:", error);
      }
    };

    fetchBuildingData();
  }, [id]);

  const theme = useTheme();
  const colorsArray = ["#FF5733", "#3498DB", "#27AE60"];

  return (
    <Container>
      <h1>Historial</h1>
      <Box className="breadcrumb">
        <h1>Detalles del Edificio</h1>
        {/* Mostrar los datos del edificio si están disponibles */}
        {buildingData ? (
          <div>
            <h2>{buildingData.nombre}</h2>
            <p>Sección: {buildingData.seccion}</p>
            <p>Ubicación: {buildingData.ubicacion}</p>
          </div>
        ) : (
          <p>Cargando datos del edificio...</p>
        )}
      </Box>

      <Box sx={{ py: "12px" }} />

      <SimpleCard title="Line Chart">
        <ComparisonChart height="350px" color={colorsArray} />
      </SimpleCard>

      <Box sx={{ py: "12px" }} />
    </Container>
  );
}
