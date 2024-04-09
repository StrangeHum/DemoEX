import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { LoginPage } from "./pages/login";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";

export function App() {
  return (
    <>
      <Header />
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
      {/* <RouterProvider router={router} /> */}
      <Footer />
    </>
  );
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={}>
//       <Route index element={<Home />} />
//       <Route path="/login" element={<LoginPage />} />,
//     </Route>
//   )
// );

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainPage />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
// ]);

export default App;
