import { RouterProvider } from "react-router";
import { router } from "./router/router";

//TODO: Тепловая карта https://www.youtube.com/watch?v=Y7tpjR2dLOQ
export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
