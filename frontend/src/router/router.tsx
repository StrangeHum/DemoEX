import { LoginPage } from "@src/pages";
import { ErrorPage } from "@src/pages/ErrorPage";
import { Home } from "@src/pages/Home";
import Layout from "@src/pages/Layout";
import { Profile } from "@src/pages/Profile";
import { Signin } from "@src/pages/Signin";
import { UserOrders } from "@src/pages/UserOrders";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <Signin />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
