import { Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/login";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";

//TODO: Тепловая карта https://www.youtube.com/watch?v=Y7tpjR2dLOQ
export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
