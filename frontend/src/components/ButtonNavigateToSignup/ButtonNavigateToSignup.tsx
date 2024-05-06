import { useNavigate } from "react-router";
import styles from "./ButtonNavigateToSignup.module.scss";
import { Button } from "@mui/material";

export type ButtonNavigateToSignupProps = {
  text?: string;
};

export const ButtonNavigateToSignup = ({
  text,
}: ButtonNavigateToSignupProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonNavigateToSignup}>
      <Button
        variant="text"
        onClick={() => {
          navigate("/signup");
        }}
      >
        {text ?? "Регистрация"}
      </Button>
    </div>
  );
};

export default ButtonNavigateToSignup;
