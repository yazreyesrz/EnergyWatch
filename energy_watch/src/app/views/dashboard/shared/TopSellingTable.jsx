import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Styled components
const ProductTable = styled("table")(() => ({
  minWidth: 400,
  "& td": { borderBottom: "none", paddingLeft: "8px", paddingRight: "8px" }, // Ajusta el padding de las celdas
}));

const TableAvatar = styled("img")(() => ({
  width: 24,
  height: 24,
  borderRadius: "50%", // Estilo para el avatar
}));

const TopSellingTable = () => {
  const navigate = useNavigate();

  const handleHistorialClick = (id) => {
    navigate(`/historial/${id}`);
  };

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/edificios/all");
        const edificios = response.data.edificio;
        setProductList(edificios);
      } catch (error) {
        console.error("Error al obtener los datos de los edificios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Sección</TableCell>
              <TableCell>Carrera</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={product._id} hover>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <TableAvatar
                      src={`/assets/images/products/iconEdificio.png`}
                    />
                    {product.nombre}
                  </Box>
                </TableCell>
                <TableCell align="left">{product.seccion}</TableCell>
                <TableCell align="left">{product.ubicacion}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleHistorialClick(product.uuid)}
                    color="primary"
                    size="small"
                  >
                    Historial
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default TopSellingTable;
