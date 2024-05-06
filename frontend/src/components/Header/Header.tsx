import cn from "classnames";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import ReactIcon from "@src/assets/react.svg";

export const Header = () => {
  const isAuth = false;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLinkItem to="/">Home</NavLinkItem>
        {!isAuth && (
          <NavLink to="/login">
            <img src={ReactIcon} alt="foo" />
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
    <NavLink to={to} className={navClassName}>
      {children}
    </NavLink>
  );
};

export default Header;
