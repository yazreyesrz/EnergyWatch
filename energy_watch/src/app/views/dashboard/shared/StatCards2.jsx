import { ExpandLess, StarOutline, TrendingUp } from "@mui/icons-material";
import { Card, Fab, Grid, lighten, styled, useTheme } from "@mui/material";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important",
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px",
}));

const H1 = styled("h1")(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled("span")(() => ({
  fontSize: "13px",
  marginLeft: "4px",
}));

const IconBox = styled("div")(() => ({
  width: 16,
  height: 16,
  color: "#fff",
  display: "flex",
  overflow: "hidden",
  borderRadius: "300px ",
  justifyContent: "center",
  "& .icon": { fontSize: "14px" },
}));

export default function StatCards2() {
  const { palette } = useTheme();
  const bgError = lighten(palette.error.main, 0.85);
}
