import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Likes from "./components/testRedux";
import { useActions } from "./components/hooks/useActions";
import { useAppDispatch } from "./components/hooks/redux";
import { setFirstName } from "./redux/user/userSlice";
import { useDispatch } from "react-redux";

//TODO: Тепловая карта https://www.youtube.com/watch?v=Y7tpjR2dLOQ
export function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Likes /> */}
    </>
  );
}

export default App;
