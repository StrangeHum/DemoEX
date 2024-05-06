import { LoginPage } from "@src/pages";
import { ErrorPage } from "@src/pages/ErrorPage";
import { Home } from "@src/pages/Home";
import Layout from "@src/pages/Layout";
import { Signin } from "@src/pages/Signin";
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
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
