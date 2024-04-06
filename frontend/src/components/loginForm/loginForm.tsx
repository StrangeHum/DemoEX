import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import classNames from "classnames";

export type formFields = {
  login: HTMLInputElement;
  password: HTMLInputElement;
  rememberMe: HTMLInputElement;
};

export interface LoginFormProps {
  onSubmit: (data: LoginFormFields) => void;
}

export type LoginFormFields = {
  login: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<LoginFormFields>({ mode: "onBlur" });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    reset();
  };

  return (
    <div className={styles.LoginForm}>
      loginPage
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          login
          <input
            className={classNames(styles.input, styles.bold)}
            {...register("login", {
              required: {
                value: true,
                message: "login is required",
              },
            })}
            type="text"
            placeholder="username"
          />
        </label>

        <div className={styles.error}>
          {errors?.login && <p>{errors?.login?.message || "Error!"}</p>}
        </div>

        <label>
          password
          <input
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
            })}
            type="password"
            placeholder="password"
          />
        </label>

        <div className={styles.error}>
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
        </div>

        <label>
          rememberMe
          <input type="checkbox" name="rememberMe" />
        </label>

        <button type="submit" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
