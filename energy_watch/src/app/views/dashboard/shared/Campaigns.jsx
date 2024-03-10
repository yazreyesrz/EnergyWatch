import Box from "@mui/material/Box";
import { Small } from "app/components/Typography";
import { MatxProgressBar, SimpleCard } from "app/components";

export default function Campaigns() {
  return (
    <Box>
      <SimpleCard title="Monitoreo">
        <Small color="text.secondary">Hoy</Small>
        <MatxProgressBar value={75} customColor="#FF8300" text="Temperatura" />
        <MatxProgressBar value={45} color="secondary" text="Volataje " />
        <MatxProgressBar value={75} color="primary" text="Electricidad " />

        <Small color="text.secondary" display="block" pt={4}>
          Ayer
        </Small>
        <MatxProgressBar value={75} customColor="#FF8300" text="Temperatura" />
        <MatxProgressBar value={45} color="secondary" text="Volateje" />
        <MatxProgressBar value={75} color="primary" text="Electricidad" />

        <Small color="text.secondary" display="block" pt={4}>
          Semana pasada
        </Small>
        <MatxProgressBar value={75} customColor="#FF8300" text="Temperatura" />
        <MatxProgressBar value={45} color="secondary" text="Volateje" />
        <MatxProgressBar value={75} color="primary" text="Electricidad" />
      </SimpleCard>
    </Box>
  );
}
