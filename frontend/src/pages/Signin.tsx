import { Controller, useForm } from "react-hook-form";
import { User, AuthData } from "@src/types";
import { Button, TextField } from "@mui/material";
import { FieldValidation } from "../components/validation/FieldValidation";

import { ButtonNavigateToLogin } from "@src/components/ButtonNavigateToLogin";

export type LoginFormFields = User & AuthData; //TODO: Создать отдельный тип для полей

export const Signin = () => {
  const methods = useForm<LoginFormFields>({ mode: "onBlur" });

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    console.log(data);
  });

  //TODO: отображение необходимости заполнить поля
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
