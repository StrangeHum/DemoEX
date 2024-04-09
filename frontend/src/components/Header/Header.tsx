import cn from "classnames";
import styles from "./Header.module.scss";
import { Link, NavLink, NavLinkProps } from "react-router-dom";

export type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLinkItem to="/">Home</NavLinkItem>
        <NavLinkItem to="/login">Авторизация</NavLinkItem>
        <NavLinkItem to="/statements">Мои заявления</NavLinkItem>
        <NavLinkItem to="/create">Создать заявление</NavLinkItem>
        <NavLinkItem to="/admin">Панель администратора</NavLinkItem>
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
