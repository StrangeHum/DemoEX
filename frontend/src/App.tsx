import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./pages/login";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MainPage } from "./pages/MainPage";

export function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default App;
