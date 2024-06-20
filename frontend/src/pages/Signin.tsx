import { Controller, useForm } from "react-hook-form";
import { User, authDataPassword } from "@src/types";
import { Button, TextField } from "@mui/material";
import { FieldValidation } from "../components/validation/FieldValidation";

import { ButtonNavigateToLogin } from "@src/components/ButtonNavigateToLogin";
import { useSigninMutation } from "@src/redux/api/user.api";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

export type LoginFormFields = User & authDataPassword;

export const SigninPage = () => {
  const navigate = useNavigate();
  const [signin, { data, isSuccess, isLoading, isError }] = useSigninMutation();

  const onSubmit = useCallback(
    (fields: LoginFormFields) => {
      const { login, password, ...user } = fields;

      signin({ authData: { login, password }, user });
    },
    [signin]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      if (!data) {
        return;
      }
      console.log(data);
    }
  }, [isSuccess]);

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Load...</div>;
  }

  return <SigninForm onSubmit={onSubmit} />;
};

export const SigninForm = (props: {
  onSubmit: (fields: LoginFormFields) => void;
}) => {
  const methods = useForm<LoginFormFields>({ mode: "onBlur" });

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    console.log(data);
    onSubmit(data);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Controller
          rules={FieldValidation}
          name="login"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextField
              label="Имя аккаунта"
              type="text"
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />

        <Controller
          rules={FieldValidation}
          name="password"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextField
              label="Пароль"
              type="password"
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          rules={FieldValidation}
          name="email"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextField
              label="email"
              type="email"
              onBlur={onBlur}
              onChange={onChange}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />

        <Button
          disabled={!isValid}
          type="submit"
          fullWidth={true}
          variant="contained"
        >
          Зарегистрироваться
        </Button>
        <ButtonNavigateToLogin />
      </form>
    </div>
  );
};
