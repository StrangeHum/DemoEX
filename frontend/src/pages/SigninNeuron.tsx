import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { User, authDataPassword } from "@src/types";
import { useSigninMutation } from "@src/redux/api/user.api"; // Путь к вашему хуку

const RegisterComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [register, { isLoading, isError, isSuccess, data }] =
    useSigninMutation();

  const onSubmit = async (data: { user: User; authData: authDataPassword }) => {
    const { user, authData } = data;
    try {
      await register(user, authData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const FieldValidation = {
    required: "Поле обязательно для заполнения",
    minLength: { value: 2, message: "Минимум 2 символа" },
    maxLength: { value: 30, message: "Максимум 30 символов" },
  };

  return (
    <div>
      <form>
        {/*onSubmit={handleSubmit(onSubmit)*/}
        <Controller
          name="user.firstName"
          control={control}
          rules={FieldValidation}
          render={({ field }) => (
            <TextField
              {...field}
              label="Имя"
              type="text"
              error={!!errors.user?.firstName}
              helperText={errors.user?.firstName?.message}
            />
          )}
        />

        <Controller
          name="user.secondName"
          control={control}
          rules={FieldValidation}
          render={({ field }) => (
            <TextField
              {...field}
              label="Отчество"
              type="text"
              error={!!errors.user?.secondName}
              helperText={errors.user?.secondName?.message}
            />
          )}
        />

        <Controller
          name="user.surname"
          control={control}
          rules={FieldValidation}
          render={({ field }) => (
            <TextField
              {...field}
              label="Фамилия"
              type="text"
              error={!!errors.user?.surname}
              helperText={errors.user?.surname?.message}
            />
          )}
        />

        <Controller
          name="user.email"
          control={control}
          rules={{
            ...FieldValidation,
            pattern: { value: /^\S+@\S+$/i, message: "Неверный формат email" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={!!errors.user?.email}
              helperText={errors.user?.email?.message}
            />
          )}
        />

        <Controller
          name="user.phone"
          control={control}
          rules={{
            ...FieldValidation,
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: "Неверный формат телефона",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Телефон"
              type="tel"
              error={!!errors.user?.phone}
              helperText={errors.user?.phone?.message}
            />
          )}
        />

        <Controller
          name="authData.login"
          control={control}
          rules={FieldValidation}
          render={({ field }) => (
            <TextField
              {...field}
              label="Имя аккаунта"
              type="text"
              error={!!errors.authData?.login}
              helperText={errors.authData?.login?.message}
            />
          )}
        />

        <Controller
          name="authData.password"
          control={control}
          rules={FieldValidation}
          render={({ field }) => (
            <TextField
              {...field}
              label="Пароль"
              type="password"
              error={!!errors.authData?.password}
              helperText={errors.authData?.password?.message}
            />
          )}
        />

        <Button disabled={!isValid} type="submit" fullWidth variant="contained">
          Зарегистрироваться
        </Button>

        {/* Компонент для навигации к странице логина */}
        {/* <ButtonNavigateToLogin /> */}
      </form>
    </div>
  );
};

export default RegisterComponent;
