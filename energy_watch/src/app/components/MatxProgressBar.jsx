import {
  Grid,
  LinearProgress,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Small } from "./Typography";

// STYLED COMPONENT
const CustomLinearProgress = styled(LinearProgress)(
  ({ theme, customColor }) => ({
    borderRadius: 2,
    background: "rgba(0, 0, 0, 0.1)",
    // Utiliza customColor si está definido, de lo contrario, usa el color predeterminado.
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: customColor || theme.palette.primary.main,
    },
  })
);

export default function MatxProgressBar({
  text = "",
  value = 75,
  spacing = 2,
  color = "primary",
  coloredText = false,
  customColor, // Nuevo prop para permitir un color personalizado
}) {
  const theme = useTheme();
  const secondary = theme.palette.text.secondary;

  return (
    <Grid container spacing={spacing} alignItems="center">
      <Grid item xs={text ? 8 : 12}>
        <CustomLinearProgress
          customColor={customColor} // Pasa el color personalizado al componente
          color={color}
          value={value}
          variant="determinate"
        />
      </Grid>

      {text !== "" && (
        <Grid item xs={text ? 4 : false}>
          <Typography color={color}>
            <Small sx={{ color: coloredText ? "" : secondary }}>{text}</Small>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
