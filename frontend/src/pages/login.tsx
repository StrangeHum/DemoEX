import React, {
  FormEventHandler,
  JSXElementConstructor,
  useEffect,
} from "react";
import { GetToken } from "src/components/hooks/useAuth";
import LoginForm from "src/components/loginForm";

export const LoginPage = () => {
  const token = async () => {
    console.log(await GetToken({ login: "log", password: "pass" }));
  };

  useEffect(() => {
    token();
  }, []);
  return (
    <>
      <LoginForm
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </>
  );
};
