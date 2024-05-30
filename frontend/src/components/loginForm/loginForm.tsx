import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FieldValidation } from "../validation/FieldValidation";
import { ButtonNavigateToSignup } from "../ButtonNavigateToSignup";

//TODO Вынести типы в файл
export interface LoginFormProps {
  onSubmit: LoginFormOnSubmit;
}

export type LoginFormOnSubmit = (data: LoginFormFields) => void;

export type LoginFormFields = {
  login: string;
  password: string;
};

export const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
  const { onSubmit } = props;

  const methods = useForm<LoginFormFields>({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = methods;

  const onSubmitForm = handleSubmit(async (data, e) => {
    console.log(data);

    onSubmit(data);
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmitForm}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Вход
      </Typography>
      <Stack spacing={2}>
        <Controller
          rules={FieldValidation}
          control={control}
          name="login"
          render={({ field }) => (
            <TextField
              {...field}
              label="логин"
              type="text"
              // onBlur={onBlur}
              // onChange={onChange}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />

        <Controller
          rules={FieldValidation}
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              label="пароль"
              type="password"
              // onBlur={onBlur}
              // onChange={onChange}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button
          type="submit"
          disabled={!isValid}
          fullWidth={true}
          variant="contained"
        >
          Войти
        </Button>

        <ButtonNavigateToSignup />
      </Stack>
    </Box>
  );
};

export default LoginForm;
