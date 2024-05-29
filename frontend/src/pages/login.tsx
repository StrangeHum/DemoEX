import { LoginForm } from "@src/components/loginForm";
import { LoginFormOnSubmit } from "@src/components/loginForm/loginForm";
import { useTryAuthMutation } from "@src/redux/api/auth.api";
import { setCredentials } from "@src/redux/auth/authSlice";
import store from "@src/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [remember, setRemember] = useState(false);

  const [loginUser, { data, isSuccess, isLoading, isError }] =
    useTryAuthMutation();

  useEffect(() => {
    if (isSuccess) {
      if (!data) {
        console.error("dataAuth");
        return;
      }

      console.log(data);

      if (remember && data.refreshToken) {
        console.log("refreshTokenSave");
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      store.dispatch(setCredentials(data));
      navigate("/profile");
    }
  }, [isSuccess]);

  const onSubmit: LoginFormOnSubmit = useCallback(
    (data) => {
      loginUser({
        login: data.login,
        password: data.password,
      });
      setRemember(data.rememberMe);
    },
    [loginUser]
  );

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Load...</div>;
  }

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};
