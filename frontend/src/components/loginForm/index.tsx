import React, { FC, FormEventHandler } from "react";
import styles from "./loginForm.module.scss";

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

const LoginForm: FC<LoginFormProps> = ({ onSubmit }: LoginFormProps) => {
  const handleSumbit: FormEventHandler<HTMLFormElement & formFields> = (
    event
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { login, password, rememberMe } = form;

    onSubmit({
      login: login.value,
      password: password.value,
      rememberMe: rememberMe.checked,
    });
  };

  return (
    <div className="loginForm">
      loginPage
      <form onSubmit={handleSumbit}>
        <label>
          <p>login</p>
          <input type="text" placeholder="username" name="login" />
        </label>
        <label>
          <p>password</p>
          <input type="password" placeholder="password" name="password" />
        </label>
        <label>
          <p>rememberMe</p>
          <input type="checkbox" name="rememberMe" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
