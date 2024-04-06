import cn from "classnames";
import styles from "./Header.module.scss";

export type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  return <div className={cn([styles.header, "header"])}>Header</div>;
};

export default Header;
