import { MatxSuspense } from "../../components";
import useSettings from "../../hooks/useSettings";
import { MatxLayouts } from "../../components/MatxLayout/index";

export default function MatxLayout(props) {
  const { settings } = useSettings();
  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
}
