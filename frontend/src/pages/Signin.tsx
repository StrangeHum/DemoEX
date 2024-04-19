import { Controller, useForm } from "react-hook-form";
import styles from "./index.module.scss";
import classNames from "classnames";
import { User, AuthData } from "@types/types.ts";
import { Button, TextField } from "@mui/material";

export type LoginFormFields = User & AuthData; //TODO: Создать отдельный тип для полей

//TODO: валидация для email
const FieldValidation = {
  required: "Обязательно для заполнения",
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return "Русские символы недопустимы";
    }
    return true;
  },
};

export const Signin = () => {
  const methods = useForm<LoginFormFields>({ mode: "onBlur" });

  const {
    register,
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
        <span>Регистрация</span>
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
        {/* <input type="submit"></input> */}
        <Button
          disabled={!isValid}
          type="submit"
          fullWidth={true}
          variant="contained"
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
