import { Box, styled } from "@mui/material";
import LogoEN from "../components/icons/logo-energywatch.png";
import { Span } from "./Typography";
import { MatxLogo } from "app/components";
import useSettings from "app/hooks/useSettings";

// STYLED COMPONENTS
const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 29px",
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: ".5rem",
  display: mode === "compact" ? "none" : "block",
}));

export default function Brand({ children }) {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <img
          src={LogoEN}
          alt=""
          width="50px"
          height="50px"
          style={{ borderRadius: "10px" }}
        />
        <StyledSpan mode={mode} className="sidenavHoverShow">
          Energy Watch
        </StyledSpan>
      </Box>

      <Box
        className="sidenavHoverShow"
        sx={{ display: mode === "compact" ? "none" : "block" }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  );
}
