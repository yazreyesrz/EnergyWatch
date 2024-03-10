import { Edit } from "@mui/icons-material";
import { format } from "date-fns";
import {
  Box,
  Card,
  Table,
  Select,
  Avatar,
  styled,
  TableRow,
  useTheme,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
} from "@mui/material";
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

export default function TopSellingTable() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Edificios</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">Esta Semana</MenuItem>
          <MenuItem value="this_month">Este Mes</MenuItem>
          <MenuItem value="this_month">Este Dia</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} sx={{ px: 3 }}>
                Nombre
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Dias
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Estatus
              </TableCell>

              <TableCell colSpan={1} sx={{ px: 0 }}>
                Editar
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell
                  colSpan={4}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center" gap={4}>
                    <Avatar src={product.imgUrl} />
                    <Paragraph>{product.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell
                  colSpan={2}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  {format(product.Date, "dd/MM/yyyy")}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.available ? (
                    product.available < 20 ? (
                      <Small bgcolor={bgSecondary}>anormal</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>estable</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>sobrecargado</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton>
                    <Edit color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
}

const productList = [
  {
    imgUrl: "/assets/images/products/iconEdificio.png",
    name: "ud1",
    Date: 5,
    available: 15,
  },
  {
    imgUrl: "/assets/images/products/iconEdificio.png",
    name: "ud5",
    Date: 10,
    available: 30,
  },
  {
    imgUrl: "/assets/images/products/iconEdificio.png",
    name: "ud8",
    Date: 3,
    available: 35,
  },
  {
    imgUrl: "/assets/images/products/iconEdificio.png",
    name: "ud4",
    Date: 6,
    available: 0,
  },
  {
    imgUrl: "/assets/images/products/iconEdificio.png",
    name: "ud8",
    Date: 17,
    available: 5,
  },
];
