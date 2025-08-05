import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Persons from "./pages/Persons";

import PrivateRoute from "./Components/PrivateRoute";
import Layout from "./Layouts";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Persons />,
          },
          {
            path: "/persons",
            element: <Persons />,
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
