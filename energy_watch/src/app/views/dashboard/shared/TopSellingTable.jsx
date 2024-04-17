import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Card,
  Table,
  Select,
  Avatar,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  MenuItem,
  styled,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { Paragraph } from "app/components/Typography";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

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
      <CardHeader>
        <Title>Edificios</Title>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} sx={{ px: 3 }}>
                Nombre
              </TableCell>
              <TableCell colSpan={2} sx={{ px: 0 }}>
                Sección
              </TableCell>
              <TableCell colSpan={2} sx={{ px: 0 }}>
                Carrera
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={product._id} hover>
                <TableCell
                  colSpan={4}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center" gap={4}>
                    <Avatar src={`/assets/images/products/iconEdificio.png`} />
                    <Paragraph>{product.nombre}</Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  {product.seccion}
                </TableCell>
                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.ubicacion}
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
