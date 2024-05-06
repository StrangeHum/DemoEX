import { GetToken } from "@src/components/hooks/useAuth";
import { LoginForm } from "@src/components/loginForm";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

import { AuthData } from "@src/types";

export const LoginPage = () => {
  const token = async () => {
    console.log(await GetToken({ login: "log", password: "pass" }));
  };

  return (
    <>
      <LoginForm
        onSubmit={(data) => {
          console.log(data);
        }}
      />
      {/* TODO: Кнопка загрузки ответа авторизации LoadingButton*/}
    </>
  );
};
