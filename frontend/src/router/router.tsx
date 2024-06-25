import { LoginPage } from "@src/pages";
import CreateOrderPage from "@src/pages/CreateOrderPage";
import FormComponent from "@src/pages/CreateOrderSecond/FormComponent";
import { ErrorPage } from "@src/pages/ErrorPage";
import { Home } from "@src/pages/Home";
import Layout from "@src/pages/Layout";
import { OrderPage } from "@src/pages/OrderPage/OrderPage";
import { Profile } from "@src/pages/Profile";
import RegisterComponent from "@src/pages/SigninNeuron";
// import { Signin } from "@src/pages/Signin";
import { UserOrders } from "@src/pages/UserOrders/UserOrders";
import OrdersPanelPage from "@src/pages/adminPanels/ordersPanel";
import UsersPanelPage from "@src/pages/adminPanels/usersPanel";
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
        element: <RegisterComponent />, //Signin
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <UserOrders />,
        children: [
          {
            path: ":id",
            element: <OrderPage />,
          },
        ],
      },
      {
        path: "adminorders",
        element: <OrdersPanelPage />,
      },
      {
        path: "adminusers",
        element: <UsersPanelPage />,
      },
      {
        path: "createorder",
        element: <FormComponent />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
