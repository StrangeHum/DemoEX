import cn from "classnames";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  logoutUser,
  selectCurrentUser,
} from "@src/redux/auth/authSlice";
import store from "@src/redux/store";
import { Typography } from "@mui/material";
import { apiOrders } from "@src/redux/api/userOrders.api";

export const Header = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    store.dispatch(logout());
    store.dispatch(apiOrders.util.invalidateTags(["Orders"]));
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        Нарушениям.Нет
      </Typography>
      <nav className={styles.nav}>
        {/* <NavLinkItem to="/">Home</NavLinkItem> */}
        {user?.firstName && <NavLinkItem to="/profile">Профиль</NavLinkItem>}
        {user?.firstName && <NavLinkItem to="/orders">Заявления</NavLinkItem>}

        {user ? (
          <button onClick={handleLogout} className={styles.navButton}>
            Выйти
          </button>
        ) : (
          <NavLink to="/login" className={styles.navLink}>
            <img src="path/to/icon.png" alt="Login" />{" "}
            {/* Убедитесь, что путь к иконке корректный */}
          </NavLink>
        )}
      </nav>
    </header>
  );
};

const navClassName = ({ isActive }: { isActive: boolean }) => {
  return cn([styles.nav, isActive ? styles.active : ""]);
};

const NavLinkItem = (props) => {
  const { to, children } = props;
  return (
    <NavLink to={to} className={navClassName} {...props}>
      {children}
    </NavLink>
  );
};

export default Header;
