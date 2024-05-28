import { LoginForm } from "@src/components/loginForm";
import { LoginFormOnSubmit } from "@src/components/loginForm/loginForm";
import { useTryAuthMutation } from "@src/redux/api/auth.api";
import { setCredentials } from "@src/redux/auth/authSlice";
import store from "@src/redux/store";
import { useCallback, useEffect } from "react";

export const LoginPage = () => {
  var remember: boolean = false;

  const [loginUser, { data, isSuccess, isLoading, isError }] =
    useTryAuthMutation();

  useEffect(() => {
    //TODO: Сорханение в local store
    console.log("не отработало)", isSuccess);
    if (isSuccess) {
      if (!data) {
        console.error("dataAuth");
        return;
      }

      console.log(data);

      if (remember && data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      store.dispatch(setCredentials(data));
    }
  }, [isSuccess]);

  const onSubmit: LoginFormOnSubmit = useCallback(
    (data) => {
      loginUser({
        login: data.login,
        password: data.password,
      });
      remember = data.rememberMe;
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
