import { Box, styled, useTheme } from "@mui/material";

import Breadcrumb from "app/components/Breadcrumb";
import SimpleCard from "app/components/SimpleCard";

import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import DoughnutChart from "./Doughnut";
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
  const theme = useTheme();

  return (
    <Container>
      <h1>VOLTAJE</h1>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Charts", path: "/charts" },
            { name: "Echarts" },
          ]}
        />
      </Box>

      <Box sx={{ py: "12px" }} />

      <SimpleCard title="Line Chart">
        <LineChart
          height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]}
        />
      </SimpleCard>

      <Box sx={{ py: "12px" }} />

      <Box sx={{ py: "12px" }} />
    </Container>
  );
}
