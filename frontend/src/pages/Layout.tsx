import { Header } from "@src/components/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
};
export default Layout;
