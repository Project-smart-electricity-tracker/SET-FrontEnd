import React from "react";
import {
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PrivateRoute requiredRole={["USER", "ADMIN"]}>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute requiredRole={["ADMIN"]}>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];

const router = createBrowserRouter(routes);

export default router;
