import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { User, authDataPassword } from "@src/types";
import { useSigninMutation } from "@src/redux/api/user.api"; // Путь к вашему хуку
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Notification } from "@components/Notification";
import {
  BaseFieldValidation,
  EmailValidation,
  PhoneValidation,
  ConfirmPasswordValidation,
} from "@components/validation/FieldValidation";

const RegisterComponent: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success";
    open: boolean;
  }>({ message: "", type: "error", open: false });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      user: {
        firstName: "",
        secondName: "",
        surname: "",
        email: "",
        phone: "",
      },
      authData: { login: "", password: "", confirmPassword: "" },
    },
  });
  const [register, { isLoading }] = useSigninMutation();

  const password = watch("authData.password");

  const onSubmit = async (data: { user: User; authData: authDataPassword }) => {
    const { user, authData } = data;
    try {
      await register({ user, authData });
      setNotification({
        message: "Успешная регистрация",
        type: "success",
        open: true,
      });
    } catch (error) {
      setNotification({ message: error.message, type: "error", open: true });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Регистрация
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="user.firstName"
          control={control}
          rules={BaseFieldValidation}
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
          rules={BaseFieldValidation}
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
          rules={BaseFieldValidation}
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
          rules={EmailValidation}
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
          rules={PhoneValidation}
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
        <Divider sx={{ my: 2 }} />

        <Controller
          name="authData.login"
          control={control}
          rules={BaseFieldValidation}
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
          rules={BaseFieldValidation}
          render={({ field }) => (
            <TextField
              {...field}
              label="Пароль"
              type={showPassword ? "text" : "password"}
              error={!!errors.authData?.password}
              helperText={errors.authData?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="authData.confirmPassword"
          control={control}
          rules={ConfirmPasswordValidation(password)}
          render={({ field }) => (
            <TextField
              {...field}
              label="Подтвердите пароль"
              type={showConfirmPassword ? "text" : "password"}
              error={!!errors.authData?.confirmPassword}
              helperText={errors.authData?.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <LoadingButton
          disabled={!isValid}
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
        >
          Зарегистрироваться
        </LoadingButton>
        <Notification
          message={notification.message}
          type={notification.type}
          open={notification.open}
        />
      </Stack>
    </Box>
  );
};

export default RegisterComponent;
