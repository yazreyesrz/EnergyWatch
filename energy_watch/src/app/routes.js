import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(
  lazy(() => import("app/views/sessions/JwtRegister"))
);
const ForgotPassword = Loadable(
  lazy(() => import("app/views/sessions/ForgotPassword"))
);
// E-CHART PAGE
const AppEchart = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartTemperatura"))
);
const AppEchartVoltaje = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartVoltaje"))
);
const AppEchartCorriente = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartCorriente"))
);
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

// HISTORIAL PAGE (DYNAMIC ROUTE)
const HistorialDetail = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartHistorial"))
);

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: "/dashboard/default",
        element: <Analytics />,
        auth: authRoles.admin,
      },
      // e-chart routes
      {
        path: "/charts/echarts",
        element: <AppEchart />,
        auth: authRoles.editor,
      },
      {
        path: "/charts/echartsV",
        element: <AppEchartVoltaje />,
        auth: authRoles.editor,
      },
      {
        path: "/charts/echartsC",
        element: <AppEchartCorriente />,
        auth: authRoles.editor,
      },
      // historial route (dynamic)
      {
        path: "/historial/:id",
        element: <HistorialDetail />,
        auth: authRoles.user, // Define los roles autorizados para acceder a esta ruta
      },
    ],
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },

  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
