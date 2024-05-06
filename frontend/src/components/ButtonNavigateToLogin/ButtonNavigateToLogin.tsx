import { useNavigate } from "react-router";
import styles from "./ButtonNavigateToLogin.module.scss";
import { Button } from "@mui/material";

export type ButtonNavigateToLoginProps = {
  text?: string;
};

export const ButtonNavigateToLogin = ({ text }: ButtonNavigateToLoginProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonNavigateToLogin}>
      <Button
        variant="text"
        onClick={() => {
          navigate("/login");
        }}
      >
        {text ?? "Есть профиль?"}
      </Button>
    </div>
  );
};

export default ButtonNavigateToLogin;
